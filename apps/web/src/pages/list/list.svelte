<script lang="ts">
	import Icon from '../../components/icon.svelte';
	import BsSpinner from '../../components/bs-spinner.svelte';
	import BsLoader from '../../components/bsLoader.svelte';
	import Footer from '../../components/footer.svelte';
	import AuthBenefitsDialog from '../../components/authBenefitsDialog.svelte';
	import InsultRequestSection from './components/insultRequestSection.svelte';
	import InsultsDisplay from './components/insultsDisplay.svelte';
	import ListControls from './components/listControls.svelte';
	import ListHero from './components/listHero.svelte';
	import ListStatsBar from './components/listStatsBar.svelte';
	import ShareInsultDialog from './components/shareInsultDialog.svelte';
	import { randomInRange } from '@porkyproductions/hat/randomInRange';
	import { fade, fly, scale } from 'svelte/transition';
	import Auth from '../login/auth.svelte';
	import { bsTheme } from '../../utils/darkMode';
	import { userInsults } from '../../typescript/insults';
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
		availableInsults = shuffle(userInsults.concat(insults));
	};

	onMount(() => {
		initSettingsListener();
		initDemotivator();
		load();
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
		availableInsults = shuffle(userInsults.concat(insults));
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
	const duration = randomInRange(800, 1500);
	const load = () => {
		setTimeout(() => (ready = true), duration);
	};

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

	type ShareDestination = 'copy' | 'x' | 'facebook' | 'reddit' | 'email' | 'other';

	const openShareDialog = (insult: string) => {
		shareDialogInsult = insult;
		shareDialogOpen = true;
	};

	const closeShareDialog = () => {
		shareDialogOpen = false;
		shareDialogInsult = '';
	};

	const createSharePayload = (insult: string) => {
		const shareUrl = typeof window === 'undefined' ? '/list.html' : window.location.href;
		const insultQuote = `"${insult}"`;
		const shareBody = `${insultQuote}\n\n${shareUrl}`;
		achievementUnlockers.shareTheHate();
		return { shareUrl, insultQuote, shareBody };
	};

	const openShareWindow = (url: string) => {
		if (typeof window === 'undefined') {
			return;
		}
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	const shareInsult = async (destination: ShareDestination) => {
		if (!shareDialogInsult) {
			return;
		}
		const { shareUrl, insultQuote, shareBody } = createSharePayload(shareDialogInsult);
		try {
			if (destination === 'copy') {
				await copyToClipboard(shareBody);
				closeShareDialog();
				return;
			}
			if (destination === 'x') {
				openShareWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(insultQuote)}&url=${encodeURIComponent(shareUrl)}`);
				closeShareDialog();
				return;
			}
			if (destination === 'facebook') {
				openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(insultQuote)}`);
				closeShareDialog();
				return;
			}
			if (destination === 'reddit') {
				openShareWindow(`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(insultQuote)}`);
				closeShareDialog();
				return;
			}
			if (destination === 'email') {
				if (typeof window === 'undefined') {
					return;
				}
				window.location.href = `mailto:?subject=${encodeURIComponent('(de)Motivator insult')}&body=${encodeURIComponent(shareBody)}`;
				closeShareDialog();
				return;
			}
			if (typeof navigator !== 'undefined' && navigator.share) {
				await navigator.share({
					title: '(de)Motivator insult',
					text: insultQuote,
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

	interface ShareProdiverButton {
		destination: ShareDestination;
		label: string;
		icon: string;
		buttonClass: string;
	}

	const buttons: ShareProdiverButton[] = [
		{ destination: 'copy', label: 'Copy', icon: 'clipboard', buttonClass: 'btn-primary' },
		{ destination: 'email', label: 'Email', icon: 'envelope', buttonClass: 'btn-secondary' },
		{ destination: 'x', label: 'Twitter / X', icon: 'twitter-x', buttonClass: 'share-btn-x' },
		{ destination: 'facebook', label: 'Facebook', icon: 'facebook', buttonClass: 'share-btn-facebook' },
		{ destination: 'reddit', label: 'Reddit', icon: 'reddit', buttonClass: 'share-btn-reddit' },
		{ destination: 'other', label: 'Other...', icon: 'three-dots', buttonClass: 'share-btn-other' }
	];

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
			<!-- Loading State -->
			<div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-body backdrop-blur-sm">
				<div class="mb-4">
					<BsSpinner type="primary" />
				</div>
				<BsLoader type="primary" loadingTime={duration} />
			</div>
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

					<!-- Copy Success Alert -->
					{#if copySuccess}
						<div transition:fly={{ y: -20 }} class="position-fixed top-0 start-50 translate-middle-x mt-3 z-3">
							<div class="alert alert-success shadow-lg" role="alert">
								<Icon name="check-circle-fill" /> Copied to clipboard!
							</div>
						</div>
					{/if}

					{#if shareDialogOpen}
						<ShareInsultDialog
							{shareDialogInsult}
							{buttons}
							onCloseDialog={closeShareDialog}
							onShareInsult={shareInsult}
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
				<!-- Not Logged In State -->
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-6">
							<div class="card border-0 shadow-lg" transition:scale>
								<div class="card-body text-center py-5">
									<div class="text-danger mb-4 text-4xl">
										<Icon name="lock-fill"/>
									</div>
									<h2 class="card-title fw-bold mb-3">Authentication Required</h2>
									<p class="card-text text-muted mb-4">
										You must be logged in to view the complete insult collection.
										Create an account or sign in to access all features.
									</p>
									<div class="d-flex gap-3 justify-content-center">
										<a href="/login.html" class="btn btn-primary btn-lg shadow-sm">
											<Icon name="box-arrow-in-right" /> Sign In
										</a>
										<a href="/signUp.html" class="btn btn-outline-primary btn-lg">
											<Icon name="person-plus" /> Create Account
										</a>
									</div>
									<div class="mt-4 d-flex justify-content-center">
										<AuthBenefitsDialog
											modalId="listBenefitsDialog"
											buttonClass="btn btn-outline-info"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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

	:global(.share-btn-copy) {
		--dmv-ppio-btn-color: #ffffff;
		--dmv-ppio-btn-bg: #6b7280;
		--dmv-ppio-btn-border-color: #6b7280;
		--dmv-ppio-btn-hover-color: #ffffff;
		--dmv-ppio-btn-hover-bg: #4b5563;
		--dmv-ppio-btn-hover-border-color: #4b5563;
		--dmv-ppio-btn-active-color: #ffffff;
		--dmv-ppio-btn-active-bg: #374151;
		--dmv-ppio-btn-active-border-color: #374151;
	}

	:global(.share-btn-x) {
		--dmv-ppio-btn-color: #ffffff;
		--dmv-ppio-btn-bg: #000000;
		--dmv-ppio-btn-border-color: #000000;
		--dmv-ppio-btn-hover-color: #ffffff;
		--dmv-ppio-btn-hover-bg: #1f1f1f;
		--dmv-ppio-btn-hover-border-color: #1f1f1f;
		--dmv-ppio-btn-active-color: #ffffff;
		--dmv-ppio-btn-active-bg: #2f2f2f;
		--dmv-ppio-btn-active-border-color: #2f2f2f;
	}

	:global(.share-btn-facebook) {
		--dmv-ppio-btn-color: #ffffff;
		--dmv-ppio-btn-bg: #0064e0;
		--dmv-ppio-btn-border-color: #0064e0;
		--dmv-ppio-btn-hover-color: #ffffff;
		--dmv-ppio-btn-hover-bg: #0064e0;
		--dmv-ppio-btn-hover-border-color: #0064e0;
		--dmv-ppio-btn-active-color: #ffffff;
		--dmv-ppio-btn-active-bg: #155ec2;
		--dmv-ppio-btn-active-border-color: #155ec2;
	}

	:global(.share-btn-reddit) {
		--dmv-ppio-btn-color: #ffffff;
		--dmv-ppio-btn-bg: #ff4500;
		--dmv-ppio-btn-border-color: #ff4500;
		--dmv-ppio-btn-hover-color: #ffffff;
		--dmv-ppio-btn-hover-bg: #e63d00;
		--dmv-ppio-btn-hover-border-color: #e63d00;
		--dmv-ppio-btn-active-color: #ffffff;
		--dmv-ppio-btn-active-bg: #cc3600;
		--dmv-ppio-btn-active-border-color: #cc3600;
	}

	:global(.share-btn-other) {
		--dmv-ppio-btn-color: #ffffff;
		--dmv-ppio-btn-bg: #14b8a6;
		--dmv-ppio-btn-border-color: #14b8a6;
		--dmv-ppio-btn-hover-color: #ffffff;
		--dmv-ppio-btn-hover-bg: #0f9f90;
		--dmv-ppio-btn-hover-border-color: #0f9f90;
		--dmv-ppio-btn-active-color: #ffffff;
		--dmv-ppio-btn-active-bg: #0d8a7c;
		--dmv-ppio-btn-active-border-color: #0d8a7c;
	}
</style>
