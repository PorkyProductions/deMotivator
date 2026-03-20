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
	import { initSettingsListener, resolveEnabledPackKeys, settingsStore } from '../../utils/userSettings';
	import { filterInsultsByMaxWords } from '../../utils/insultLength';
	import { submitInsultRequest } from '../../utils/insultRequests';
	import { onAuthStateChanged } from '../../utils/firebase';
	import { achievementUnlockers } from '../../utils/achievements';
	let dmv;
	let availableInsults = $state([]);

	const initDemotivator = async () => {
		const { DeMotivator } = await import('demotivator');
		dmv = new DeMotivator();
		const selectedPacks = resolveEnabledPackKeys($settingsStore);
		const insults = dmv.createArray({ packs: selectedPacks });
		availableInsults = shuffle(insults);
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
		if (!dmv) {
			return;
		}
		const selectedPacks = resolveEnabledPackKeys($settingsStore);
		const insults = dmv.createArray({ packs: selectedPacks });
		availableInsults = shuffle(insults);
	});

	// State management
	let searchQuery = $state('');
	let currentPage = $state(1);
	const itemsPerPage = $state(20);
	let viewMode = $state<'cards' | 'list'>('cards');
	let ready = $state(false);
	let copySuccess = $state('');
	let favoriteInsults = $state(new Set());
	let showFavoritesOnly = $state(false);
	let shareDialogOpen = $state(false);
	let shareDialogInsult = $state('');

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

	$effect(() => {
		if (searchQuery || showFavoritesOnly || $settingsStore.maxInsultWords || $settingsStore.selectedPacks.length) {
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

	const openShareDialog = (insult: string) => {
		shareDialogInsult = insult;
		shareDialogOpen = true;
	};

	const closeShareDialog = () => {
		shareDialogOpen = false;
		shareDialogInsult = '';
	};

	const shareInsult = async (destination: ShareDestination) => {
		if (!shareDialogInsult) {
			return;
		}
		const sharePayload = createSharePayload({
			shareText: `"${shareDialogInsult}"`,
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

<div id="root" data-bs-theme={bsTheme} class="min-h-screen bg-body">
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
						onShuffleInsults={shuffleInsults}
						onSearchQueryChange={setSearchQuery}
						onShowFavoritesOnlyChange={setShowFavoritesOnly}
						onViewModeChange={setViewMode}
					/>

					{#if copySuccess}
						<CopySuccessAlert />
					{/if}

					{#if shareDialogOpen}
						<ShareSheetDialog
							dialogTitle="Share insult"
							dialogDescription="Choose where to share this insult:"
							previewText={`"${shareDialogInsult}"`}
							buttons={defaultShareButtons}
							onCloseDialog={closeShareDialog}
							onShare={shareInsult}
						/>
					{/if}

					<InsultsDisplay
						{filteredInsults}
						{paginatedInsults}
						{viewMode}
						{favoriteInsults}
						{currentPage}
						{totalPages}
						{getPaginationRange}
						{goToPage}
						onCopyToClipboard={copyToClipboard}
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
