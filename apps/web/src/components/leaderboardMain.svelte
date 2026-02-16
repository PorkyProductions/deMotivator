<script lang="ts">
    import '../styles/scss/bootstrap.scss';
    import { leaderboard } from '../typescript/readInsults';
    import { getListOfAllUsersWhoHaveSeenInsults as getList } from '../typescript/readInsults';
    import { randomInRange } from '@porkyproductions/hat/randomInRange';
    import { fade, fly, scale } from 'svelte/transition';
    import { parentCompany } from '../typescript/constants';
    import { bsTheme } from '../utils/darkMode';
    import type { BsModalProps } from '../typescript/types';

    import Title from './title.svelte';
    import BsLoader from './bsLoader.svelte';
    import Icon from './icon.svelte';
    import BsSpinner from './bs-spinner.svelte';
    import BsModal from './bs-modal.svelte';
    import BsAlert from './bs-Alert.svelte';

    const modalProps: BsModalProps = {
    	icon: 'patch-question',
    	preButtonIcon: 'patch-question',
    	preButtonText: `What is a ${parentCompany}ID?`,
    	preButtonType: 'info',
    	title: `About ${parentCompany}IDs`,
    	body: `A ${parentCompany}ID is a unique identifier for your account. When you create an account, PorkyProductions generates a unique series of characters tied to your profile. You can find your UserID on the account page.`,
    	closeButtonText: 'Got it',
    	closeButtonType: 'secondary',
    	confirmButtonAction: () => window.location.href = '/login.html',
    	confirmButtonText: 'View My Account',
    	confirmButtonType: 'info'
    };

    // State management
    let ready = $state(false);
    let loading = $state(false);
    let error = $state(null);
    let lastUpdated = $state(new Date());
    const duration = randomInRange(800, 2000);
    let initialLoadComplete = $state(false);

    const load = async (d: number = duration) => {
    	setTimeout(() => (ready = true), d);
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

    load();

    // Load leaderboard data on mount (only once)
    $effect(() => {
    	if (!initialLoadComplete) {
    		getList();
    		initialLoadComplete = true;
    	}
    });
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen bg-body">
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
        <div class="bg-gradient-to-br from-primary-subtle to-body-tertiary py-5 px-4 mb-5" transition:fade>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-12 text-center">
                        <a href="/" class="text-decoration-none">
                            <span class="display-6 fw-bold text-body">
                                <Title />
                            </span>
                        </a>
                        <h1 class="display-4 fw-bold mt-3 mb-2">
                            <Icon name="trophy-fill" /> Leaderboard
                        </h1>

                        <!-- Action Buttons -->
                        <div class="d-flex gap-2 justify-content-center flex-wrap">
                            <button
                                onclick={refreshLeaderboard}
                                class="btn btn-primary btn-lg shadow-sm"
                                disabled={loading}
                            >
                                {#if loading}
                                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Refreshing...
                                {:else}
                                    <Icon name="arrow-clockwise" /> Refresh
                                {/if}
                            </button>
                            <BsModal {...modalProps} />
                            <a href="/login.html" class="btn btn-outline-primary btn-lg">
                                <Icon name="person-circle" /> My Account
                            </a>
                        </div>

                        {#if lastUpdated}
                            <small class="text-muted d-block mt-3">
                                Last updated: {lastUpdated.toLocaleTimeString()}
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
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body text-center">
                                <div class="text-primary-majorelle-blue dark:text-primary-majorelle-blue mb-2 text-4xl">
                                    <Icon name="people-fill" />
                                </div>
                                <h3 class="card-title h5 text-secondary">Total Participants</h3>
                                <p class="card-text display-6 fw-bold">{leaderboard.length}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body text-center">
                                <div class="text-success mb-2 text-4xl">
                                    <Icon name="eye-fill" />
                                </div>
                                <h3 class="card-title h5 text-secondary">Total Views</h3>
                                <p class="card-text display-6 fw-bold">
                                    {formatNumber(leaderboard.reduce((acc, entry) => acc + entry.data, 0))}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body text-center">
                                <div class="text-warning mb-2 text-4xl">
                                    <Icon name="bar-chart-fill" />
                                </div>
                                <h3 class="card-title h5 text-secondary">Average Views</h3>
                                <p class="card-text display-6 fw-bold">
                                    {Math.round(leaderboard.reduce((acc, entry) => acc + entry.data, 0) / leaderboard.length)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Top 3 Podium -->
                {#if leaderboard.length >= 3}
                    <div class="row g-4 mb-5" transition:fly={{ y: 20, delay: 300 }}>
                        <div class="col-12">
                            <h2 class="h3 fw-bold text-center mb-4">🏆 Top Performers</h2>
                            <div class="row g-3 align-items-end">
                                <!-- Silver - 2nd Place -->
                                <div class="col-md-4 order-md-1">
                                    <div class="card border-0 shadow bg-body-secondary h-100" transition:scale={{ delay: 400 }}>
                                        <div class="card-body text-center py-4">
                                            <div class="display-1 mb-3">🥈</div>
                                            <h3 class="h5 fw-bold mb-1">2nd Place</h3>
                                            <p class="text-muted small mb-2">
                                                <code>{leaderboard[1].referrer}</code>
                                            </p>
                                            <p class="display-6 fw-bold text-primary-majorelle-blue dark:text-primary-majorelle-blue">{formatNumber(leaderboard[1].data)}</p>
                                            <p class="text-muted small mb-0">insults seen</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Gold - 1st Place -->
                                <div class="col-md-4 order-md-2">
                                    <div class="card border-0 shadow-lg bg-warning bg-opacity-10 h-100" transition:scale={{ delay: 500 }}>
                                        <div class="card-body text-center py-5">
                                            <div class="display-1 mb-3">🥇</div>
                                            <h3 class="h4 fw-bold mb-1">Champion</h3>
                                            <p class="text-muted small mb-2">
                                                <code>{leaderboard[0].referrer}</code>
                                            </p>
                                            <p class="display-5 fw-bold text-primary-majorelle-blue dark:text-primary-majorelle-blue">{formatNumber(leaderboard[0].data)}</p>
                                            <p class="text-muted small mb-0">insults seen</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Bronze - 3rd Place -->
                                <div class="col-md-4 order-md-3">
                                    <div class="card border-0 shadow bg-info bg-opacity-10 h-100" transition:scale={{ delay: 600 }}>
                                        <div class="card-body text-center py-4">
                                            <div class="display-1 mb-3">🥉</div>
                                            <h3 class="h5 fw-bold mb-1">3rd Place</h3>
                                            <p class="text-muted small mb-2">
                                                <code>{leaderboard[2].referrer}</code>
                                            </p>
                                            <p class="display-6 fw-bold text-primary-majorelle-blue dark:text-primary-majorelle-blue">{formatNumber(leaderboard[2].data)}</p>
                                            <p class="text-muted small mb-0">insults seen</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Full Leaderboard Table -->
                <div class="card border-0 shadow-sm" transition:fly={{ y: 20, delay: 400 }}>
                    <div class="card-header bg-body-tertiary border-0 py-3">
                        <h2 class="h5 mb-0 fw-bold">
                            <Icon name="list-ol" /> Complete Rankings
                        </h2>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead class="">
                                    <tr>
                                        <th scope="col" class="text-center" style="width: 80px;">Rank</th>
                                        <th scope="col">User ID</th>
                                        <th scope="col" class="text-end">Insults Seen</th>
                                        <th scope="col" class="text-center" style="width: 100px;">Trend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each leaderboard as entry, index}
                                        <tr transition:fade={{ delay: index * 50 }}>
                                            <td class="text-center fw-bold">
                                                {#if getMedalIcon(index + 1)}
                                                    <span class="fs-4">{getMedalIcon(index + 1)}</span>
                                                {:else}
                                                    <span class="badge bg-secondary rounded-pill">#{index + 1}</span>
                                                {/if}
                                            </td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <img
                                                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${entry.referrer}`}
                                                        alt="User Avatar"
                                                        class="rounded-circle me-3"
                                                        style="width: 32px; height: 32px;"
                                                    />
                                                    <code class="text-truncate" style="max-width: 300px;">
                                                        {entry.referrer}
                                                    </code>
                                                </div>
                                            </td>
                                            <td class="text-end">
                                                <span class="fw-semibold">{formatNumber(entry.data)}</span>
                                            </td>
                                            <td class="text-center">
                                                {#if index < 3}
                                                    <span class="badge bg-success-subtle text-success">
                                                        <Icon name="lightning" /> Top 3
                                                    </span>
                                                {:else if index < 10}
                                                    <span class="badge bg-primary-subtle text-primary">
                                                        <Icon name="graph-up-arrow" /> Top 10
                                                    </span>
                                                {:else if index < 25}
                                                    <span class="badge bg-info-subtle text-info">
                                                        <Icon name="arrow-up-right" /> Top 25
                                                    </span>
                                                {:else}
                                                    <span class="text-muted">—</span>
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
                <div class="card border-0 shadow-sm">
                    <div class="card-body text-center py-5">
                        <div class="text-muted mb-3">
                            <Icon name="inbox"/>
                        </div>
                        <h3 class="h4">No Data Available</h3>
                        <p class="text-muted mb-4">The leaderboard is currently empty.</p>
                        <a href="/login.html" class="btn btn-primary">
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

    /* Add subtle hover effect to table rows */
    :global(.table-hover tbody tr:hover) {
        transform: translateX(4px);
        transition: transform 0.2s ease;
    }

    /* Smooth loading spinner */
    :global(.spinner-border-sm) {
        width: 1rem;
        height: 1rem;
        border-width: 0.2em;
    }
</style>
