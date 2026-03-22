<script lang="ts">
	import Footer from '../../components/footer.svelte';
	import LoadingOverlay from './components/loadingOverlay.svelte';
	import CopySuccessAlert from './components/copySuccessAlert.svelte';
	import AuthRequiredCard from './components/authRequiredCard.svelte';
	import InsultRequestSection from './components/insultRequestSection.svelte';
	import InsultsDisplay from './components/insultsDisplay.svelte';
	import ListControls from './components/listControls.svelte';
	import ListHero from './components/listHero.svelte';
	import ListStatsBar from './components/listStatsBar.svelte';
	import ShareSheetDialog from '../../components/shareSheetDialog.svelte';
	import {
		createSharePayload,
		defaultShareButtons,
		getShareDestinationUrl,
		openShareEmail,
		openShareWindow,
		type ShareDestination
	} from '../../utils/shareSheet';
	import Auth from '../login/auth.svelte';
	import { bsTheme } from '../../utils/darkMode';
	import { onMount } from 'svelte';
	import shuffle from 'lodash/shuffle';
	import {
		availableInsultPacks,
		initSettingsListener,
		resolveEnabledPackKeys,
		settingsStore,
		type UserSettings
	} from '../../utils/userSettings';
	import { filterInsultsByMaxWords } from '../../utils/insultLength';
	import { submitInsultRequest } from '../../utils/insultRequests';
	import { onAuthStateChanged } from '../../utils/firebase';
	import { achievementUnlockers } from '../../utils/achievements';
	import { getRandomExclamationCount, shouldPostProcessInsult, transformInsultText } from '../../utils/insultTransform';
	let dmv;
	let availableInsults = $state([]);
	let listSelectedPackKeys = $state<string[]>([]);

	const isSamePackKeyArray = (leftPackKeys: string[], rightPackKeys: string[]) => {
		if (leftPackKeys.length !== rightPackKeys.length) {
			return false;
		}
		return leftPackKeys.every((packKey, index) => rightPackKeys[index] === packKey);
	};

	const sanitizeListSelectedPackKeys = (packKeys: string[], settings: UserSettings) => {
		const allowedPackKeys = availableInsultPacks
			.filter((pack) => settings.allowProfanity || !pack.explicit)
			.map((pack) => pack.key);
		const allowedPackKeySet = new Set(allowedPackKeys);
		const sanitizedPackKeys = Array.from(new Set(packKeys)).filter((packKey) => allowedPackKeySet.has(packKey));
		if (sanitizedPackKeys.length > 0) {
			return sanitizedPackKeys;
		}
		const fallbackPackKeys = resolveEnabledPackKeys(settings).filter((packKey) => allowedPackKeySet.has(packKey));
		if (fallbackPackKeys.length > 0) {
			return fallbackPackKeys;
		}
		return allowedPackKeys.slice(0, 1);
	};

	const updateInsultPool = () => {
		if (!dmv) {
			return;
		}
		const selectedPacks = sanitizeListSelectedPackKeys(listSelectedPackKeys, $settingsStore);
		if (!isSamePackKeyArray(selectedPacks, listSelectedPackKeys)) {
			listSelectedPackKeys = selectedPacks;
			return;
		}
		const insults = dmv.createArray({ packs: selectedPacks });
		availableInsults = shuffle(insults);
	};

	const setListSelectedPackKeys = (packKeys: string[]) => {
		listSelectedPackKeys = sanitizeListSelectedPackKeys(packKeys, $settingsStore);
	};

	const selectedPackKeySignature = $derived(listSelectedPackKeys.join('|'));

	const initDemotivator = async () => {
		const { DeMotivator } = await import('demotivator');
		dmv = new DeMotivator();
		listSelectedPackKeys = sanitizeListSelectedPackKeys(resolveEnabledPackKeys($settingsStore), $settingsStore);
		updateInsultPool();
	};

	onMount(() => {
		let mounted = true;
		initSettingsListener();
		initDemotivator().finally(() => {
			if (mounted) {
				ready = true;
			}
		});
		const unsubscribe = onAuthStateChanged(async (user) => {
			const { readUserFavoriteInsults } = await import('../../utils/userFavoriteInsults');
			const userId = user?.id;
			if (!userId) {
				favoriteInsults = new Set();
				return;
			}
			try {
				const loadedFavoriteInsults = await readUserFavoriteInsults(userId);
				favoriteInsults = new Set(loadedFavoriteInsults);
			} catch (error) {
				console.error('Failed to load favorite insults', error);
				favoriteInsults = new Set();
			}
		});
		return () => {
			mounted = false;
			unsubscribe();
		};
	});

	$effect(() => {
		$settingsStore.allowProfanity;
		$settingsStore.selectedPacks;
		listSelectedPackKeys;
		if (!dmv) {
			return;
		}
		updateInsultPool();
	});

	// State management
	let searchQuery = $state('');
	let currentPage = $state(1);
	const itemsPerPage = $state(20);
	let viewMode = $state<'cards' | 'list'>('cards');
	let ready = $state(false);
	let copySuccess = $state('');
	let favoriteInsults = $state(new Set());
	let displayInsultMap = $state<Record<string, string>>({});
	let angryExclamationMap = $state<Record<string, number>>({});
	let showFavoritesOnly = $state(false);
	let shareDialogOpen = $state(false);
	let shareDialogInsult = $state('');
	let shareDialogDisplayInsult = $state('');

	// Insult request state
	let requestText = $state('');
	let requestSubmitting = $state(false);
	let requestSuccess = $state('');
	let requestError = $state('');

	// Loading
	// Computed values for filtering and pagination
	const currentInsultSet = $derived.by(() => {
		return filterInsultsByMaxWords(availableInsults, $settingsStore.maxInsultWords);
	});

	const filteredInsults = $derived(currentInsultSet.filter((insult: string) => {
		const matchesSearch = insult.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFavorite = !showFavoritesOnly || favoriteInsults.has(insult);
		return matchesSearch && matchesFavorite;
	}));

	const totalPages = $derived(Math.ceil(filteredInsults.length / itemsPerPage));
	const paginatedInsults = $derived(filteredInsults.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	));

	const getStableExclamationCount = (insult: string) => {
		const existingExclamationCount = angryExclamationMap[insult];
		if (existingExclamationCount !== undefined) {
			return existingExclamationCount;
		}
		const nextExclamationCount = getRandomExclamationCount();
		angryExclamationMap = {
			...angryExclamationMap,
			[insult]: nextExclamationCount
		};
		return nextExclamationCount;
	};

	const resolveDisplayInsult = async (insult: string, settings: UserSettings) => {
		if (!shouldPostProcessInsult(settings)) {
			return insult;
		}
		const exclamationCount = settings.angryMode ? getStableExclamationCount(insult) : undefined;
		return await transformInsultText(insult, settings, { exclamationCount });
	};

	let displayTransformRunId = 0;
	$effect(() => {
		const paginatedInsultsSnapshot = [...paginatedInsults];
		const shareDialogInsultSnapshot = shareDialogInsult;
		const settingsSnapshot = $settingsStore;
		const runId = ++displayTransformRunId;
		void (async () => {
			const nextDisplayInsultMap: Record<string, string> = {};
			for (const insult of paginatedInsultsSnapshot) {
				nextDisplayInsultMap[insult] = await resolveDisplayInsult(insult, settingsSnapshot);
			}
			const nextShareDialogDisplayInsult = shareDialogInsultSnapshot
				? await resolveDisplayInsult(shareDialogInsultSnapshot, settingsSnapshot)
				: '';
			if (runId !== displayTransformRunId) {
				return;
			}
			displayInsultMap = nextDisplayInsultMap;
			shareDialogDisplayInsult = nextShareDialogDisplayInsult;
		})();
	});

	$effect(() => {
		selectedPackKeySignature;
		if (searchQuery || showFavoritesOnly || $settingsStore.maxInsultWords || selectedPackKeySignature) {
			currentPage = 1;
		}
	});

	// Functions
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			copySuccess = text;
			setTimeout(() => (copySuccess = ''), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const copyInsultToClipboard = async (insult: string) => {
		const displayInsult = displayInsultMap[insult] ?? await resolveDisplayInsult(insult, $settingsStore);
		await copyToClipboard(displayInsult);
	};

	const openShareDialog = (insult: string) => {
		shareDialogInsult = insult;
		shareDialogDisplayInsult = displayInsultMap[insult] ?? '';
		shareDialogOpen = true;
	};

	const closeShareDialog = () => {
		shareDialogOpen = false;
		shareDialogInsult = '';
		shareDialogDisplayInsult = '';
	};

	const shareInsult = async (destination: ShareDestination) => {
		if (!shareDialogInsult) {
			return;
		}
		const displayInsult = shareDialogDisplayInsult || await resolveDisplayInsult(shareDialogInsult, $settingsStore);
		const sharePayload = createSharePayload({
			shareText: `"${displayInsult}"`,
			shareTitle: '(de)Motivator insult'
		});
		const { shareUrl, shareText, shareBody } = sharePayload;
		achievementUnlockers.shareTheHate();
		try {
			if (destination === 'copy') {
				await copyToClipboard(shareBody);
				closeShareDialog();
				return;
			}
			if (destination === 'x' || destination === 'facebook' || destination === 'reddit') {
				openShareWindow(getShareDestinationUrl(destination, sharePayload));
				closeShareDialog();
				return;
			}
			if (destination === 'email') {
				openShareEmail(sharePayload);
				closeShareDialog();
				return;
			}
			if (typeof navigator !== 'undefined' && navigator.share) {
				await navigator.share({
					title: '(de)Motivator insult',
					text: shareText,
					url: shareUrl
				});
				closeShareDialog();
				return;
			}
			await copyToClipboard(shareBody);
			closeShareDialog();
		} catch (error) {
			console.error('Failed to share insult', error);
		}
	};

	const toggleFavorite = async (insult: string) => {
		const nextFavoriteInsults = new Set(favoriteInsults);
		const { saveUserFavoriteInsults } = await import('../../utils/userFavoriteInsults');
		if (nextFavoriteInsults.has(insult)) {
			nextFavoriteInsults.delete(insult);
		} else {
			nextFavoriteInsults.add(insult);
		}
		favoriteInsults = nextFavoriteInsults;
		try {
			await saveUserFavoriteInsults(nextFavoriteInsults);
		} catch (error) {
			console.error('Failed to save favorite insults', error);
		}
	};

	const shuffleInsults = () => {
		availableInsults = shuffle([...availableInsults]);
		currentPage = 1;
	};

	const clearFilters = () => {
		searchQuery = '';
		showFavoritesOnly = false;
	};

	const setRequestText = (value: string) => {
		requestText = value;
	};

	const setSearchQuery = (value: string) => {
		searchQuery = value;
	};

	const setShowFavoritesOnly = (value: boolean) => {
		showFavoritesOnly = value;
	};

	const setViewMode = (value: 'cards' | 'list') => {
		viewMode = value;
	};

	const submitRequest = async () => {
		if (!requestText.trim()) return;

		requestSubmitting = true;
		requestError = '';
		requestSuccess = '';

		try {
			await submitInsultRequest(requestText);
			requestSuccess = 'Request submitted successfully!';
			requestText = '';
			setTimeout(() => (requestSuccess = ''), 3000);
		} catch (err) {
			requestError = err instanceof Error ? err.message : 'Failed to submit request.';
			setTimeout(() => (requestError = ''), 5000);
		} finally {
			requestSubmitting = false;
		}
	};

	// Pagination helpers
	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const getPaginationRange = () => {
		const range = [];
		const showPages = 5;
		let pagesCopy = showPages;
		pagesCopy >>= 1; // equivalent to Math.floor(showPages / 2) for small positive ints
		let start = Math.max(1, currentPage - pagesCopy);
		const end = Math.min(totalPages, start + showPages - 1);

		if (end - start < showPages - 1) {
			start = Math.max(1, end - showPages + 1);
		}

		for (let i = start; i <= end; i++) {
			range.push(i);
		}
		return range;
	};
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen dark:bg-theme-black">
	<Auth let:loggedIn>
		{#if !ready}
			<LoadingOverlay />
		{:else}
			<ListHero />

			{#if loggedIn}
				<!-- Main Content -->
				<div class="container pb-5">
					<ListStatsBar
						totalCount={currentInsultSet.length}
						filteredCount={filteredInsults.length}
						favoriteCount={favoriteInsults.size}
						{currentPage}
						{totalPages}
					/>

					<InsultRequestSection
						{requestText}
						{requestSubmitting}
						{requestSuccess}
						{requestError}
						onRequestTextChange={setRequestText}
						onSubmitRequest={submitRequest}
					/>

					<ListControls
						{searchQuery}
						{showFavoritesOnly}
						{viewMode}
						availableInsultPacks={availableInsultPacks}
						selectedPackKeys={listSelectedPackKeys}
						allowProfanity={$settingsStore.allowProfanity}
						onShuffleInsults={shuffleInsults}
						onSearchQueryChange={setSearchQuery}
						onShowFavoritesOnlyChange={setShowFavoritesOnly}
						onViewModeChange={setViewMode}
						onPackSelectionChange={setListSelectedPackKeys}
					/>

					{#if copySuccess}
						<CopySuccessAlert />
					{/if}

						{#if shareDialogOpen}
							<ShareSheetDialog
								dialogTitle="Share insult"
								dialogDescription="Choose where to share this insult:"
								previewText={`"${shareDialogDisplayInsult || shareDialogInsult}"`}
								buttons={defaultShareButtons}
								onCloseDialog={closeShareDialog}
								onShare={shareInsult}
						/>
					{/if}

					<InsultsDisplay
						{filteredInsults}
						{paginatedInsults}
						{displayInsultMap}
						{viewMode}
						{favoriteInsults}
						{currentPage}
						{totalPages}
						{getPaginationRange}
						{goToPage}
						onCopyToClipboard={copyInsultToClipboard}
						onOpenShareDialog={openShareDialog}
						onToggleFavorite={toggleFavorite}
						onClearFilters={clearFilters}
					/>
				</div>
			{:else}
				<AuthRequiredCard />
			{/if}

			<!-- Footer Navigation -->
			<Footer />

		{/if}
	</Auth>
</div>

<style>
	:global(body), :global(html) {
		height: 100%;
		margin: 0;
	}

	/* Hover effects */
	:global(.hover-shadow-lg) {
		transition: box-shadow 0.3s ease;
	}

	:global(.hover-shadow-lg:hover) {
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
	}

	:global(.hover-bg-light:hover) {
		background-color: rgba(0, 0, 0, 0.02);
		transition: background-color 0.2s ease;
	}

	/* Smooth transitions */
	:global(.transition-shadow) {
		transition: box-shadow 0.3s ease;
	}

	/* Fixed positioning for copy alert */
	:global(.z-3) {
		z-index: 1050;
	}
</style>
