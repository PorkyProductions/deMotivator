<script lang="ts">
	import { leaderboard } from '../typescript/readInsults';
	import { getListOfAllUsersWhoHaveSeenInsults as getList } from '../typescript/readInsults';
	import { fade, fly, scale } from 'svelte/transition';
	import { bsTheme } from '../utils/darkMode';
	import { getAvatarApiUrl } from '../utils/avatarApi';

	import Title from './title.svelte';
	import { Icon } from '@demotivator/ui';
	import Spinhog from './spinhog.svelte';
	import { BsAlert } from '@demotivator/ui';

	// State management
	let ready = $state(false);
	let loading = $state(false);
	let error = $state();
	let lastUpdated = $state(new Date());

	const totalViews = $derived(leaderboard.reduce((acc, entry) => acc + entry.data, 0));
	const averageViews = $derived(leaderboard.length > 0 ? Math.round(totalViews / leaderboard.length) : 0);

	const loadInitialLeaderboard = async () => {
		try {
			await getList();
			lastUpdated = new Date();
		} catch (err) {
			error = err;
		} finally {
			ready = true;
		}
	};

	const refreshLeaderboard = async () => {
		loading = true;
		error = null;
		try {
			await getList();
			lastUpdated = new Date();
			setTimeout(() => (loading = false), 300);
		} catch (err) {
			error = err;
			loading = false;
		}
	};

	// Bronze medal Easter egg click counter
	let bronzeClicks = $state(0);
	const handleBronzeClick = () => {
		bronzeClicks++;
		if (bronzeClicks >= 30) window.location.href = '/egg.html';
	};

	// Get medal icon based on position
	const getMedalIcon = (position: number) => {
		switch(position) {
			case 1: return '🥇';
			case 2: return '🥈';
			case 3: return '🥉';
			default: return null;
		}
	};

	// Format large numbers
	const formatNumber = (num: number) => {
		return num.toLocaleString();
	};

	const getLeaderboardAvatarUrl = (referrer?: string) => {
		const matchedEntry = leaderboard.find((entry) => entry.referrer === referrer);
		const profileId = referrer ?? 'guest-user';
		if (!matchedEntry?.isCurrentUser) {
			return getAvatarApiUrl({
				userId: profileId,
				displayName: profileId,
				photoUrl: ''
			});
		}
		return getAvatarApiUrl({
			userId: profileId,
			displayName: matchedEntry?.displayName ?? profileId,
			photoUrl: matchedEntry?.photoUrl
		});
	};

	const getDisplayName = (position: number) => {
		const entry = leaderboard[position];
		if (!entry) {
			return 'Unknown User';
		}
		return entry.isCurrentUser
			? entry.displayName || entry.referrer || 'Unknown User'
			: entry.referrer || 'Unknown User';
	};

	const getCurrentUserRank = () => {
		const index = leaderboard.findIndex((entry) => entry.isCurrentUser);
		return index >= 0 ? index + 1 : null;
	};

	const getLeaderboardRowId = (referrer?: string) => `leaderboard-row-${encodeURIComponent(referrer ?? '')}`;

	const jumpToCurrentUser = () => {
		const currentUserEntry = leaderboard.find((entry) => entry.isCurrentUser);
		if (!currentUserEntry?.referrer) {
			return;
		}
		const tableRow = document.getElementById(getLeaderboardRowId(currentUserEntry.referrer));
		tableRow?.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	};

	loadInitialLeaderboard();
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen dark:bg-theme-black">
	{#if !ready}
		<!-- Loading State -->
		<div transition:fade={{ duration: 300 }} class="backdrop-blur-sm">
			<Spinhog />
		</div>
	{:else}
		<!-- Hero Section -->
		<div class="leaderboard-hero py-10 px-4 mb-4" transition:fade>
			<div class="container">
				<div class="row align-items-center">
					<div class="col-12 text-center">
						<a href="/" class="text-decoration-none">
							<span class="display-6 fw-bold text-body">
								<Title />
							</span>
						</a>
						<div class="hero-badge mx-auto mt-3 mb-2">
							<span class="badge rounded-pill px-3 py-2 text-bg-warning bg-opacity-15 text-warning-emphasis fw-semibold">
								<Icon name="trophy-fill" /> Global Rankings
							</span>
						</div>
						<h1 class="display-3 fw-bold mb-3 leaderboard-title">
							Leaderboard
						</h1>

						<!-- Action Buttons -->
						<div class="d-flex gap-2 justify-content-center flex-wrap mb-3">
							<button
								onclick={refreshLeaderboard}
								class="btn btn-primary btn-lg shadow-sm px-4"
								disabled={loading}
							>
								{#if loading}
									<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
									Refreshing...
								{:else}
									<Icon name="arrow-clockwise" /> Refresh
								{/if}
							</button>
							<a href="/account.html" class="btn btn-outline-primary btn-lg px-4">
								<Icon name="person-circle" /> My Account
							</a>
							{#if getCurrentUserRank()}
								<button onclick={jumpToCurrentUser} class="btn btn-outline-success btn-lg px-4">
									<Icon name="crosshair2" /> Jump to Me (#{getCurrentUserRank()})
								</button>
							{/if}
						</div>

						{#if lastUpdated}
							<small class="text-muted d-block">
								<Icon name="clock" /> Last updated: {lastUpdated.toLocaleTimeString()}
							</small>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="container pb-5">
			{#if error}
				<div transition:fly={{ y: -20 }} class="mb-4">
					<BsAlert
						icon="exclamation-triangle-fill"
						type="danger"
						text={error.message ?? 'Failed to load leaderboard. Please try again.'}
						actionLink="/leaderboard.html"
						actionText="Retry"
					/>
				</div>
			{/if}

			{#if leaderboard && leaderboard.length > 0}
				<!-- Stats Cards -->
				<div class="row g-4 mb-5" transition:fly={{ y: 20, delay: 200 }}>
					<div class="col-md-4">
						<div class="card border-0 shadow-sm h-100 rounded-4">
							<div class="card-body text-center p-4">
								<div class="stat-icon-wrap stat-icon-primary mx-auto mb-3">
									<Icon name="people-fill" />
								</div>
								<h3 class="card-title h6 text-uppercase text-secondary fw-bold tracking-wide mb-1">Total Participants</h3>
								<p class="card-text display-5 fw-bold mb-0">{formatNumber(leaderboard.length)}</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card border-0 shadow-sm h-100 rounded-4">
							<div class="card-body text-center p-4">
								<div class="stat-icon-wrap stat-icon-success mx-auto mb-3">
									<Icon name="eye-fill" />
								</div>
								<h3 class="card-title h6 text-uppercase text-secondary fw-bold tracking-wide mb-1">Total Views</h3>
								<p class="card-text display-5 fw-bold mb-0">
									{formatNumber(totalViews)}
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card border-0 shadow-sm h-100 rounded-4">
							<div class="card-body text-center p-4">
								<div class="stat-icon-wrap stat-icon-warning mx-auto mb-3">
									<Icon name="bar-chart-fill" />
								</div>
								<h3 class="card-title h6 text-uppercase text-secondary fw-bold tracking-wide mb-1">Average Views</h3>
								<p class="card-text display-5 fw-bold mb-0">
									{formatNumber(averageViews)}
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Top 3 Podium -->
				{#if leaderboard.length >= 3}
					<div class="mb-5" transition:fly={{ y: 20, delay: 300 }}>
						<h2 class="h4 fw-bold text-center mb-4 d-flex align-items-center justify-content-center gap-2">
							<span class="text-warning">🏆</span> Top Performers
						</h2>
						<div class="row g-3 align-items-end">
							<!-- Silver - 2nd Place -->
							<div class="col-md-4 order-md-1">
								<div class="card border-0 shadow-sm rounded-4 podium-silver h-100" transition:scale={{ delay: 400 }}>
									<div class="card-body text-center py-4 px-3">
										<div class="podium-medal mb-3">🥈</div>
										<h3 class="h6 fw-bold text-secondary text-uppercase tracking-wide mb-3">2nd Place</h3>
										<div class="d-flex justify-content-center mb-3">
											<img
												src={getLeaderboardAvatarUrl(leaderboard[1].referrer)}
												alt="2nd place avatar"
												class="rounded-circle shadow podium-avatar podium-avatar-sm"
											/>
										</div>
										<p class="text-muted small mb-2 text-truncate px-2">
											<code>{getDisplayName(1)}</code>
										</p>
										<p class="display-6 fw-bold text-primary-majorelle-blue dark:text-primary-majorelle-blue mb-0">{formatNumber(leaderboard[1].data)}</p>
										<p class="text-muted small mb-0">insults seen</p>
									</div>
								</div>
							</div>

							<!-- Gold - 1st Place -->
							<div class="col-md-4 order-md-2">
								<div class="card border-0 shadow-lg rounded-4 podium-gold h-100" transition:scale={{ delay: 500 }}>
									<div class="card-body text-center py-5 px-3">
										<div class="podium-medal podium-medal-lg mb-3">🥇</div>
										<div class="badge bg-warning bg-opacity-20 text-warning-emphasis rounded-pill px-3 py-1 mb-2 fw-semibold">
											<Icon name="crown-fill" /> Champion
										</div>
										<div class="d-flex justify-content-center mt-3 mb-3">
											<img
												src={getLeaderboardAvatarUrl(leaderboard[0].referrer)}
												alt="1st place avatar"
												class="rounded-circle shadow-lg podium-avatar podium-avatar-lg"
											/>
										</div>
										<p class="text-muted small mb-2 text-truncate px-2">
											<code>{getDisplayName(0)}</code>
										</p>
										<p class="display-5 fw-bold text-primary-majorelle-blue dark:text-primary-majorelle-blue mb-0">{formatNumber(leaderboard[0].data)}</p>
										<p class="text-muted small mb-0">insults seen</p>
									</div>
								</div>
							</div>

							<!-- Bronze - 3rd Place -->
							<div class="col-md-4 order-md-3">
								<div class="card border-0 shadow-sm rounded-4 podium-bronze h-100" transition:scale={{ delay: 600 }}>
									<div class="card-body text-center py-4 px-3">
										<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
										<div class="podium-medal mb-3" onclick={handleBronzeClick} role="presentation" style="cursor: default; user-select: none;">🥉</div>
										<h3 class="h6 fw-bold text-secondary text-uppercase tracking-wide mb-3">3rd Place</h3>
										<div class="d-flex justify-content-center mb-3">
											<img
												src={getLeaderboardAvatarUrl(leaderboard[2].referrer)}
												alt="3rd place avatar"
												class="rounded-circle shadow podium-avatar podium-avatar-sm"
											/>
										</div>
										<p class="text-muted small mb-2 text-truncate px-2">
											<code>{getDisplayName(2)}</code>
										</p>
										<p class="display-6 fw-bold text-primary-majorelle-blue dark:text-primary-majorelle-blue mb-0">{formatNumber(leaderboard[2].data)}</p>
										<p class="text-muted small mb-0">insults seen</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Full Leaderboard Table -->
				<div class="card border-0 shadow-sm rounded-4 border-l-4 border-primary-majorelle-blue dark:border-primary-majorelle-blue" transition:fly={{ y: 20, delay: 400 }}>
					<div class="card-header border-0 py-3 px-4 d-flex align-items-center gap-2">
						<div class="stat-icon-wrap stat-icon-primary stat-icon-sm">
							<Icon name="list-ol" />
						</div>
						<h2 class="h5 mb-0 fw-bold">Complete Rankings</h2>
					</div>
					<div class="card-body p-0">
						<div class="table-responsive">
							<table class="table table-hover mb-0">
								<thead>
									<tr>
										<th scope="col" class="text-center ps-4" style="width: 80px;">Rank</th>
										<th scope="col">Player</th>
										<th scope="col" class="text-end">Insults Seen</th>
										<th scope="col" class="text-center pe-4" style="width: 110px;">Standing</th>
									</tr>
								</thead>
								<tbody>
									{#each leaderboard as entry, index}
										<tr
											id={getLeaderboardRowId(entry.referrer)}
											transition:fade={{ delay: index * 30 }}
											class:current-user-row={entry.isCurrentUser}
										>
											<td class="text-center fw-bold ps-4 align-middle">
												{#if getMedalIcon(index + 1)}
													<span class="fs-4">{getMedalIcon(index + 1)}</span>
												{:else}
													<span class="badge rounded-pill rank-badge">#{index + 1}</span>
												{/if}
											</td>
											<td class="align-middle">
												<div class="d-flex align-items-center gap-2">
													<img
														src={getLeaderboardAvatarUrl(entry.referrer)}
														alt="User Avatar"
														class="rounded-circle flex-shrink-0"
														style="width: 36px; height: 36px;"
													/>
													<div class="min-w-0">
														<div class="d-flex align-items-center gap-2 flex-wrap">
															<code class="text-truncate d-block" style="max-width: 260px;">
																{entry.isCurrentUser ? (entry.displayName ?? entry.referrer) : entry.referrer}
															</code>
															{#if entry.isCurrentUser}
																<span class="badge bg-success rounded-pill">You</span>
															{/if}
														</div>
													</div>
												</div>
											</td>
											<td class="text-end align-middle">
												<span class="fw-bold fs-6">{formatNumber(entry.data)}</span>
											</td>
											<td class="text-center align-middle pe-4">
												{#if index < 3}
													<span class="badge rounded-pill standing-top3">
														<Icon name="lightning-fill" /> Top 3
													</span>
												{:else if index < 10}
													<span class="badge rounded-pill standing-top10">
														<Icon name="graph-up-arrow" /> Top 10
													</span>
												{:else if index < 25}
													<span class="badge rounded-pill standing-top25">
														<Icon name="arrow-up-right" /> Top 25
													</span>
												{:else}
													<span class="text-muted small">—</span>
												{/if}
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			{:else}
				<!-- Empty State -->
				<div class="card border-0 shadow-sm rounded-4 text-center py-5 px-4">
					<div class="card-body py-5">
						<div class="stat-icon-wrap stat-icon-primary mx-auto mb-4" style="width: 72px; height: 72px; font-size: 2rem;">
							<Icon name="trophy" />
						</div>
						<h3 class="h4 fw-bold mb-2">No Data Yet</h3>
						<p class="text-muted mb-4">Be the first one on the leaderboard!</p>
						<a href="/login.html" class="btn btn-primary btn-lg px-5">
							<Icon name="person-plus" /> Create Account
						</a>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	:global(body), :global(html) {
		height: 100%;
		margin: 0;
	}

	/* Hero section */
	.leaderboard-hero {
		position: relative;
	}

	.leaderboard-title {
		background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	[data-bs-theme='dark'] .leaderboard-title {
		background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Stat icon circles */
	:global(.stat-icon-wrap) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		font-size: 1.5rem;
	}

	:global(.stat-icon-sm) {
		width: 36px;
		height: 36px;
		font-size: 1rem;
	}

	:global(.stat-icon-primary) {
		background: rgb(79 70 229 / 12%);
		color: #4f46e5;
	}

	:global([data-bs-theme='dark'] .stat-icon-primary) {
		background: rgb(79 70 229 / 25%);
		color: #818cf8;
	}

	:global(.stat-icon-success) {
		background: rgb(34 197 94 / 12%);
		color: #16a34a;
	}

	:global([data-bs-theme='dark'] .stat-icon-success) {
		background: rgb(34 197 94 / 22%);
		color: #4ade80;
	}

	:global(.stat-icon-warning) {
		background: rgb(251 191 36 / 15%);
		color: #b45309;
	}

	:global([data-bs-theme='dark'] .stat-icon-warning) {
		background: rgb(251 191 36 / 22%);
		color: #fbbf24;
	}

	/* Podium cards */
	.podium-gold {
		border-top: 3px solid #f59e0b !important;
	}

	.podium-silver {
		border-top: 3px solid #94a3b8 !important;
	}

	.podium-bronze {
		border-top: 3px solid #b45309 !important;
	}

	.podium-medal {
		font-size: 3rem;
		line-height: 1;
	}

	.podium-medal-lg {
		font-size: 4rem;
	}

	.podium-avatar {
		object-fit: cover;
		border: 3px solid transparent;
	}

	.podium-avatar-sm {
		width: 60px;
		height: 60px;
		border-color: rgb(148 163 184 / 40%);
	}

	.podium-avatar-lg {
		width: 80px;
		height: 80px;
		border-color: rgb(251 191 36 / 50%);
	}

	/* Table styling */
	.rank-badge {
		background: rgb(79 70 229 / 12%);
		color: #4f46e5;
		font-size: 0.75rem;
	}

	:global([data-bs-theme='dark'] .rank-badge) {
		background: rgb(79 70 229 / 25%);
		color: #818cf8;
	}

	:global(.current-user-row) {
		background: rgb(34 197 94 / 6%) !important;
	}

	:global([data-bs-theme='dark'] .current-user-row) {
		background: rgb(34 197 94 / 10%) !important;
	}

	.standing-top3 {
		background: rgb(22 163 74 / 12%);
		color: #15803d;
	}

	:global([data-bs-theme='dark'] .standing-top3) {
		background: rgb(34 197 94 / 20%);
		color: #4ade80;
	}

	.standing-top10 {
		background: #4f46e5;
		color: #fff;
	}

	.standing-top25 {
		background: rgb(6 182 212 / 12%);
		color: #0e7490;
	}

	:global([data-bs-theme='dark'] .standing-top25) {
		background: rgb(6 182 212 / 22%);
		color: #67e8f9;
	}

	/* Smooth loading spinner */
	:global(.spinner-border-sm) {
		width: 1rem;
		height: 1rem;
		border-width: 0.2em;
	}
</style>
