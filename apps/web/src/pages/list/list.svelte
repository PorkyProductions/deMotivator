<script lang="ts">
	import Title from '../../components/title.svelte';
	import Icon from '../../components/icon.svelte';
	import BsSpinner from '../../components/bs-spinner.svelte';
	import BsLoader from '../../components/bsLoader.svelte';
	import Footer from '../../components/footer.svelte';
	import { randomInRange } from '@porkyproductions/hat/randomInRange';
	import { fade, fly, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Auth from '../login/auth.svelte';
	import { bsTheme } from '../../utils/darkMode';
	import { userInsults } from '../../typescript/insults';
	import { onMount } from 'svelte';
	import shuffle from 'lodash/shuffle';
	import { initSettingsListener, resolveEnabledPackKeys, settingsStore } from '../../utils/userSettings';
	import { filterInsultsByMaxWords } from '../../utils/insultLength';
	import { submitInsultRequest } from '../../utils/insultRequests';
	import { onAuthStateChanged } from '../../utils/firebase';
	import { readUserFavoriteInsults, saveUserFavoriteInsults } from '../../utils/userFavoriteInsults';
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
	let viewMode = $state('cards'); // "cards" or "list"
	let ready = $state(false);
	let copySuccess = $state('');
	let favoriteInsults = $state(new Set());
	let showFavoritesOnly = $state(false);

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

	const toggleFavorite = async (insult: string) => {
		const nextFavoriteInsults = new Set(favoriteInsults);
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
			<!-- Hero Section -->
			<div class="bg-linear-to-br from-danger-subtle to-body-tertiary py-5 px-4 mb-5" transition:fade>
				<div class="container">
					<div class="text-center">
						<a href="/" class="text-decoration-none">
							<span class="display-6 fw-bold text-body">
								<Title />
							</span>
						</a>
						<h1 class="display-4 fw-bold mt-3 mb-2">
							<Icon name="chat-quote-fill" /> All Insults
						</h1>
					</div>
				</div>
			</div>

			{#if loggedIn}
				<!-- Main Content -->
				<div class="container pb-5">
					<!-- Stats Bar -->
					<div class="row g-3 mb-4" transition:fly={{ y: 20, delay: 200 }}>
						<div class="col-md-3 col-6">
							<div class="card border-0 shadow-sm">
								<div class="card-body text-center py-3">
									<div class="text-primary small mb-1">Total</div>
									<div class="h4 mb-0 fw-bold">{currentInsultSet.length}</div>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-6">
							<div class="card border-0 shadow-sm">
								<div class="card-body text-center py-3">
									<div class="text-success small mb-1">Filtered</div>
									<div class="h4 mb-0 fw-bold">{filteredInsults.length}</div>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-6">
							<div class="card border-0 shadow-sm">
								<div class="card-body text-center py-3">
									<div class="text-warning small mb-1">Favorites</div>
									<div class="h4 mb-0 fw-bold">{favoriteInsults.size}</div>
								</div>
							</div>
						</div>
						<div class="col-md-3 col-6">
							<div class="card border-0 shadow-sm">
								<div class="card-body text-center py-3">
									<div class="text-info small mb-1">Page</div>
									<div class="h4 mb-0 fw-bold">{currentPage}/{totalPages || 1}</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Insult Request Form -->
					<div class="card border-0 shadow-sm mb-4" transition:fly={{ y: 20, delay: 250 }}>
						<div class="card-body">
							<h2 class="h6 mb-3 fw-bold">
								<Icon name="chat-left-text" /> Request a New Insult
							</h2>
							<p class="text-muted small mb-3">
								Have an idea for a demotivating insult? Submit it for review!
							</p>
							<div class="row g-2">
								<div class="col-lg-8">
									<input
										type="text"
										class="form-control"
										placeholder="Your demotivating insult idea..."
										bind:value={requestText}
										disabled={requestSubmitting}
										maxlength="500"
									/>
								</div>
								<div class="col-lg-4">
									<button
										class="btn btn-primary w-100"
										onclick={submitRequest}
										disabled={requestSubmitting || !requestText.trim()}
									>
										{#if requestSubmitting}
											<span class="spinner-border spinner-border-sm me-2" role="status"></span>
											Submitting...
										{:else}
											<Icon name="send" /> Submit Request
										{/if}
									</button>
								</div>
							</div>
							{#if requestSuccess}
								<div transition:fly={{ y: -10 }} class="alert alert-success mt-3 mb-0">
									<Icon name="check-circle-fill" /> {requestSuccess}
								</div>
							{/if}
							{#if requestError}
								<div transition:fly={{ y: -10 }} class="alert alert-danger mt-3 mb-0">
									<Icon name="exclamation-triangle-fill" /> {requestError}
								</div>
							{/if}
						</div>
					</div>

					<!-- Controls -->
					<div class="card border-0 shadow-sm mb-4" transition:fly={{ y: 20, delay: 300 }}>
						<div class="card-body">
							<div class="row g-3">
								<!-- Search -->
								<div class="col-lg-4">
									<div class="input-group">
										<span class="input-group-text">
											<Icon name="search" />
										</span>
										<input
											type="text"
											class="form-control"
											placeholder="Search insults..."
											bind:value={searchQuery}
										/>
										{#if searchQuery}
											<button
												class="btn btn-outline-secondary"
												onclick={() => searchQuery = ''}
											>
												<Icon name="x-lg" />
											</button>
										{/if}
									</div>
								</div>

								<!-- Filters -->
								<div class="col-lg-4">
									<div class="btn-group w-100" role="group">
										<input
											type="checkbox"
											class="btn-check"
											id="favCheck"
											bind:checked={showFavoritesOnly}
										/>
										<label class="btn btn-outline-warning" for="favCheck">
											<Icon name="star-fill" /> Favorites
										</label>
									</div>
								</div>

								<!-- Actions -->
								<div class="col-lg-4">
									<div class="btn-group w-100" role="group">
										<button
											class="btn btn-outline-primary"
											onclick={shuffleInsults}
										>
											<Icon name="shuffle" /> Shuffle
										</button>
										<button
											class="btn btn-outline-secondary"
											onclick={() => viewMode = viewMode === 'cards' ? 'list' : 'cards'}
										>
											{#if viewMode === 'cards'}
												<Icon name="list-ul" /> List
											{:else}
												<Icon name="grid-3x3-gap" /> Cards
											{/if}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Copy Success Alert -->
					{#if copySuccess}
						<div transition:fly={{ y: -20 }} class="position-fixed top-0 start-50 translate-middle-x mt-3 z-3">
							<div class="alert alert-success shadow-lg" role="alert">
								<Icon name="check-circle-fill" /> Copied to clipboard!
							</div>
						</div>
					{/if}

					<!-- Insults Display -->
					{#if filteredInsults.length > 0}
						{#if viewMode === 'cards'}
							<!-- Card View -->
							<div class="row g-4 mb-4">
								{#each paginatedInsults as insult, i (insult)}
									<div
										class="col-lg-6"
										transition:scale={{ delay: i * 50 }}
										animate:flip={{ duration: 300 }}
									>
										<div class="card h-100 border-0 shadow-sm hover-shadow-lg transition-shadow">
											<div class="card-body d-flex flex-column">
												<p class="card-text fs-5 grow mb-3">
													"{insult}"
												</p>
												<div class="d-flex gap-2 justify-content-end">
													<button
														class="btn btn-sm btn-outline-primary"
														onclick={() => copyToClipboard(insult)}
														title="Copy"
													>
														<Icon name="clipboard" />
													</button>
													<button
														class={`btn btn-sm ${favoriteInsults.has(insult) ? 'btn-warning' : 'btn-outline-warning'}`}
														onclick={() => toggleFavorite(insult)}
														title="Favorite"
													>
														<Icon name={favoriteInsults.has(insult) ? 'star-fill' : 'star'} />
													</button>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						{:else}
							<!-- List View -->
							<div class="card border-0 shadow-sm mb-4">
								<ul class="list-group list-group-flush">
									{#each paginatedInsults as insult, i (insult)}
										<li
											class="list-group-item py-3 hover-bg-light"
											transition:fade={{ delay: i * 30 }}
											animate:flip={{ duration: 300 }}
										>
											<div class="d-flex justify-content-between align-items-center">
												<span class="fs-5 me-3">"{insult}"</span>
												<div class="d-flex gap-2">
													<button
														class="btn btn-sm btn-outline-primary"
														onclick={() => copyToClipboard(insult)}
														title="Copy"
													>
														<Icon name="clipboard" />
													</button>
													<button
														class={`btn btn-sm ${favoriteInsults.has(insult) ? 'btn-warning' : 'btn-outline-warning'}`}
														onclick={() => toggleFavorite(insult)}
														title="Favorite"
													>
														<Icon name={favoriteInsults.has(insult) ? 'star-fill' : 'star'} />
													</button>
												</div>
											</div>
										</li>
									{/each}
								</ul>
							</div>
						{/if}

						<!-- Pagination -->
						{#if totalPages > 1}
							<nav aria-label="Insults pagination">
								<ul class="pagination pagination-lg justify-content-center">
									<li class={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
										<button
											class="page-link"
											onclick={() => goToPage(currentPage - 1)}
											disabled={currentPage === 1}
										>
											<Icon name="chevron-left" />
										</button>
									</li>

									{#if currentPage > 3}
										<li class="page-item">
											<button class="page-link" onclick={() => goToPage(1)}>1</button>
										</li>
										{#if currentPage > 4}
											<li class="page-item disabled">
												<span class="page-link">...</span>
											</li>
										{/if}
									{/if}

									{#each getPaginationRange() as page}
										<li class={`page-item ${currentPage === page ? 'active' : ''}`}>
											<button
												class="page-link"
												onclick={() => goToPage(page)}
											>
												{page}
											</button>
										</li>
									{/each}

									{#if currentPage < totalPages - 2}
										{#if currentPage < totalPages - 3}
											<li class="page-item disabled">
												<span class="page-link">...</span>
											</li>
										{/if}
										<li class="page-item">
											<button class="page-link" onclick={() => goToPage(totalPages)}>
												{totalPages}
											</button>
										</li>
									{/if}

									<li class={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
										<button
											class="page-link"
											onclick={() => goToPage(currentPage + 1)}
											disabled={currentPage === totalPages}
										>
											<Icon name="chevron-right" />
										</button>
									</li>
								</ul>
							</nav>
						{/if}
					{:else}
						<!-- Empty State -->
						<div class="card border-0 shadow-sm">
							<div class="card-body text-center py-5">
								<div class="text-muted mb-3 text-4xl">
									<Icon name="search-heart"/>
								</div>
								<h3 class="h4">No Results Found</h3>
								<p class="text-muted mb-4">
									Try adjusting your filters or search terms
								</p>
								<button
									class="btn btn-primary"
									onclick={() => { searchQuery = ''; showFavoritesOnly = false; }}
								>
									<Icon name="arrow-clockwise" /> Clear Filters
								</button>
							</div>
						</div>
					{/if}
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
</style>
