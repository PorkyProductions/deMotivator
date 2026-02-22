<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Auth from '../login/auth.svelte';
	import Footer from '../../components/footer.svelte';
	import Icon from '../../components/icon.svelte';
	import Title from '../../components/title.svelte';
	import BsSpinner from '../../components/bs-spinner.svelte';
	import BsLoader from '../../components/bsLoader.svelte';
	import { bsTheme } from '../../utils/darkMode';
	import { randomInRange } from '@porkyproductions/hat/randomInRange';
	import { adminAccessStore, initAdminAccessListener } from '../../utils/adminAccess';
	import {
		listInsultRequests,
		approveInsultRequest,
		rejectInsultRequest,
		flushApprovedRequests,
		getInsultRequestStats,
		type InsultRequest
	} from '../../utils/insultRequests';
	import { getListOfAllUsersWhoHaveSeenInsults, leaderboard } from '../../typescript/readInsults';

	const loadingDuration = randomInRange(800, 1500);
	let ready = $state(false);
	let loading = $state(false);
	let error = $state<string | null>(null);

	// Stats
	let totalUsers = $state(0);
	let totalInsultsSeen = $state(0);
	let pendingCount = $state(0);
	let approvedCount = $state(0);
	let rejectedCount = $state(0);

	// Request lists
	let pendingRequests = $state<InsultRequest[]>([]);
	let approvedRequests = $state<InsultRequest[]>([]);
	let rejectedRequests = $state<InsultRequest[]>([]);
	let recentRequests = $state<InsultRequest[]>([]);

	// UI state
	let activeTab = $state<'pending' | 'approved' | 'rejected' | 'recent'>('pending');
	let approvingIds = $state<Set<string>>(new Set());
	let rejectingIds = $state<Set<string>>(new Set());

	const load = async () => {
		await new Promise((resolve) => setTimeout(resolve, loadingDuration));
		ready = true;
	};

	const loadStats = async () => {
		try {
			const [requestStats] = await Promise.all([
				getInsultRequestStats(),
				getListOfAllUsersWhoHaveSeenInsults()
			]);

			pendingCount = requestStats.pending;
			approvedCount = requestStats.approved;
			rejectedCount = requestStats.rejected;
			totalUsers = leaderboard.length;
			totalInsultsSeen = leaderboard.reduce((sum, entry) => sum + (entry.data || 0), 0);
		} catch (err) {
			console.error('Failed to load stats:', err);
		}
	};

	const loadRequests = async () => {
		loading = true;
		error = null;
		try {
			const [pending, approved, rejected, recent] = await Promise.all([
				listInsultRequests('pending'),
				listInsultRequests('approved'),
				listInsultRequests('rejected'),
				listInsultRequests()
			]);

			pendingRequests = pending;
			approvedRequests = approved;
			rejectedRequests = rejected;
			recentRequests = recent.slice(0, 10);

			await loadStats();
		} catch (err) {
			error = err.message || 'Failed to load requests';
		} finally {
			loading = false;
		}
	};

	const handleApprove = async (requestId: string) => {
		if (!requestId) return;

		approvingIds.add(requestId);
		approvingIds = new Set(approvingIds);

		try {
			await approveInsultRequest(requestId);
			await loadRequests();
		} catch (err) {
			error = err.message || 'Failed to approve request';
			setTimeout(() => (error = null), 5000);
		} finally {
			approvingIds.delete(requestId);
			approvingIds = new Set(approvingIds);
		}
	};

	const handleReject = async (requestId: string) => {
		if (!requestId) return;

		rejectingIds.add(requestId);
		rejectingIds = new Set(rejectingIds);

		try {
			await rejectInsultRequest(requestId);
			await loadRequests();
		} catch (err) {
			error = err.message || 'Failed to reject request';
			setTimeout(() => (error = null), 5000);
		} finally {
			rejectingIds.delete(requestId);
			rejectingIds = new Set(rejectingIds);
		}
	};

	const handleFlush = async () => {
		if (!confirm('Are you sure you want to flush all approved requests? This action cannot be undone.')) {
			return;
		}

		loading = true;
		try {
			const count = await flushApprovedRequests();
			alert(`Successfully flushed ${count} approved request(s).`);
			await loadRequests();
		} catch (err) {
			error = err.message || 'Failed to flush approved requests';
			setTimeout(() => (error = null), 5000);
		} finally {
			loading = false;
		}
	};

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		}).format(date);
	};

	onMount(() => {
		initAdminAccessListener();
		load();
	});

	$effect(() => {
		if ($adminAccessStore.isAdmin && ready) {
			loadRequests();
		}
	});
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen bg-body">
	<Auth let:loggedIn>
		{#if !ready || $adminAccessStore.loading}
			<div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-body backdrop-blur-sm">
				<div class="mb-4">
					<BsSpinner type="primary" />
				</div>
				<BsLoader type="primary" loadingTime={loadingDuration} />
			</div>
		{:else if !loggedIn || !$adminAccessStore.isAuthenticated}
			<!-- Not Authenticated -->
			<div class="container py-5">
				<div class="row justify-content-center">
					<div class="col-lg-6">
						<div class="card border-0 shadow-lg" transition:fly={{ y: 20 }}>
							<div class="card-body text-center py-5">
								<div class="text-danger mb-4 text-4xl">
									<Icon name="shield-lock-fill"/>
								</div>
								<h2 class="card-title fw-bold mb-3">Access Denied</h2>
								<p class="card-text text-muted mb-4">
									You must be signed in to access this page.
								</p>
								<div class="d-flex gap-3 justify-content-center">
									<a href="/login.html" class="btn btn-primary btn-lg shadow-sm">
										<Icon name="box-arrow-in-right" /> Sign In
									</a>
									<a href="/" class="btn btn-outline-primary btn-lg">
										<Icon name="house-door-fill" /> Go Home
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else if !$adminAccessStore.isAdmin}
			<!-- Not Admin -->
			<div class="container py-5">
				<div class="row justify-content-center">
					<div class="col-lg-6">
						<div class="card border-0 shadow-lg" transition:fly={{ y: 20 }}>
							<div class="card-body text-center py-5">
								<div class="text-warning mb-4 text-4xl">
									<Icon name="exclamation-triangle-fill"/>
								</div>
								<h2 class="card-title fw-bold mb-3">Access Denied</h2>
								<p class="card-text text-muted mb-4">
									You do not have administrator privileges to access this page.
								</p>
								<div class="d-flex gap-3 justify-content-center">
									<a href="/" class="btn btn-primary btn-lg shadow-sm">
										<Icon name="house-door-fill" /> Go Home
									</a>
									<a href="/login.html" class="btn btn-outline-primary btn-lg">
										<Icon name="person-circle" /> My Account
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<!-- Admin Dashboard -->
			<div class="bg-linear-to-br from-primary-subtle to-body-tertiary py-5 px-4 mb-5" transition:fade>
				<div class="container">
					<div class="text-center">
						<a href="/" class="text-decoration-none">
							<span class="display-6 fw-bold text-body">
								<Title />
							</span>
						</a>
						<h1 class="display-5 fw-bold mt-3 mb-2">
							<Icon name="speedometer2" /> Admin Dashboard
						</h1>
						<p class="text-muted">Welcome, Administrator</p>
						<button
							onclick={loadRequests}
							class="btn btn-primary mt-2"
							disabled={loading}
						>
							{#if loading}
								<span class="spinner-border spinner-border-sm me-2" role="status"></span>
								Refreshing...
							{:else}
								<Icon name="arrow-clockwise" /> Refresh Data
							{/if}
						</button>
					</div>
				</div>
			</div>

			<div class="container pb-5">
				{#if error}
					<div transition:fly={{ y: -20 }} class="alert alert-danger mb-4">
						<Icon name="exclamation-triangle-fill" /> {error}
					</div>
				{/if}

				<!-- Stats Cards -->
				<div class="row g-3 mb-4" transition:fly={{ y: 20, delay: 200 }}>
					<div class="col-lg-3 col-md-4 col-6">
						<div class="card border-0 shadow-sm">
							<div class="card-body text-center py-3">
								<div class="text-primary small mb-1">Total Users</div>
								<div class="h4 mb-0 fw-bold">{totalUsers.toLocaleString()}</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-4 col-6">
						<div class="card border-0 shadow-sm">
							<div class="card-body text-center py-3">
								<div class="text-success small mb-1">Insults Seen</div>
								<div class="h4 mb-0 fw-bold">{totalInsultsSeen.toLocaleString()}</div>
							</div>
						</div>
					</div>
					<div class="col-lg-2 col-md-4 col-6">
						<div class="card border-0 shadow-sm">
							<div class="card-body text-center py-3">
								<div class="text-warning small mb-1">Pending</div>
								<div class="h4 mb-0 fw-bold">{pendingCount}</div>
							</div>
						</div>
					</div>
					<div class="col-lg-2 col-md-4 col-6">
						<div class="card border-0 shadow-sm">
							<div class="card-body text-center py-3">
								<div class="text-info small mb-1">Approved</div>
								<div class="h4 mb-0 fw-bold">{approvedCount}</div>
							</div>
						</div>
					</div>
					<div class="col-lg-2 col-md-4 col-6">
						<div class="card border-0 shadow-sm">
							<div class="card-body text-center py-3">
								<div class="text-danger small mb-1">Rejected</div>
								<div class="h4 mb-0 fw-bold">{rejectedCount}</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Request Management Tabs -->
				<div class="card border-0 shadow-sm mb-4" transition:fly={{ y: 20, delay: 300 }}>
					<div class="card-header bg-body-tertiary border-0">
						<ul class="nav nav-tabs card-header-tabs" role="tablist">
							<li class="nav-item" role="presentation">
								<button
									class={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
									onclick={() => activeTab = 'pending'}
									type="button"
								>
									<Icon name="clock-history" /> Pending ({pendingCount})
								</button>
							</li>
							<li class="nav-item" role="presentation">
								<button
									class={`nav-link ${activeTab === 'approved' ? 'active' : ''}`}
									onclick={() => activeTab = 'approved'}
									type="button"
								>
									<Icon name="check-circle" /> Approved ({approvedCount})
								</button>
							</li>
							<li class="nav-item" role="presentation">
								<button
									class={`nav-link ${activeTab === 'rejected' ? 'active' : ''}`}
									onclick={() => activeTab = 'rejected'}
									type="button"
								>
									<Icon name="x-circle" /> Rejected ({rejectedCount})
								</button>
							</li>
							<li class="nav-item" role="presentation">
								<button
									class={`nav-link ${activeTab === 'recent' ? 'active' : ''}`}
									onclick={() => activeTab = 'recent'}
									type="button"
								>
									<Icon name="list-ul" /> Recent Activity
								</button>
							</li>
						</ul>
					</div>
					<div class="card-body">
						{#if activeTab === 'pending'}
							<!-- Pending Requests -->
							{#if pendingRequests.length === 0}
								<div class="text-center py-5 text-muted">
									<Icon name="inbox" />
									<p class="mt-3">No pending requests</p>
								</div>
							{:else}
								<div class="table-responsive">
									<table class="table table-striped table-hover mb-0">
										<thead>
											<tr>
												<th>Insult Text</th>
												<th>Submitted By</th>
												<th>Created</th>
												<th style="width: 180px;">Actions</th>
											</tr>
										</thead>
										<tbody>
											{#each pendingRequests as request (request.id)}
												<tr transition:fade>
													<td class="align-middle">"{request.text}"</td>
													<td class="align-middle">
														<div class="small">
															<div class="fw-semibold">{request.requestedByName || 'Anonymous'}</div>
															<div class="text-muted">{request.requestedByEmail || 'N/A'}</div>
														</div>
													</td>
													<td class="align-middle">
														<small class="text-muted">{formatDate(request.createdAt)}</small>
													</td>
													<td class="align-middle">
														<div class="btn-group btn-group-sm" role="group">
															<button
																class="btn btn-success"
																onclick={() => handleApprove(request.id!)}
																disabled={approvingIds.has(request.id!) || rejectingIds.has(request.id!)}
															>
																{#if approvingIds.has(request.id!)}
																	<span class="spinner-border spinner-border-sm" role="status"></span>
																{:else}
																	<Icon name="check-lg" />
																{/if}
															</button>
															<button
																class="btn btn-danger"
																onclick={() => handleReject(request.id!)}
																disabled={approvingIds.has(request.id!) || rejectingIds.has(request.id!)}
															>
																{#if rejectingIds.has(request.id!)}
																	<span class="spinner-border spinner-border-sm" role="status"></span>
																{:else}
																	<Icon name="x-lg" />
																{/if}
															</button>
														</div>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
						{:else if activeTab === 'approved'}
							<!-- Approved Requests -->
							<div class="d-flex justify-content-between align-items-center mb-3">
								<h3 class="h6 mb-0">Approved Insult Requests</h3>
								{#if approvedRequests.length > 0}
									<button
										class="btn btn-sm btn-danger"
										onclick={handleFlush}
										disabled={loading}
									>
										<Icon name="trash" /> Flush Approved List ({approvedCount})
									</button>
								{/if}
							</div>
							{#if approvedRequests.length === 0}
								<div class="text-center py-5 text-muted">
									<Icon name="check-circle" />
									<p class="mt-3">No approved requests</p>
								</div>
							{:else}
								<div class="table-responsive">
									<table class="table table-striped table-hover mb-0">
										<thead>
											<tr>
												<th>Insult Text</th>
												<th>Submitted By</th>
												<th>Approved</th>
											</tr>
										</thead>
										<tbody>
											{#each approvedRequests as request (request.id)}
												<tr transition:fade>
													<td class="align-middle">"{request.text}"</td>
													<td class="align-middle">
														<div class="small">
															<div class="fw-semibold">{request.requestedByName || 'Anonymous'}</div>
															<div class="text-muted">{request.requestedByEmail || 'N/A'}</div>
														</div>
													</td>
													<td class="align-middle">
														<small class="text-muted">{request.reviewedAt ? formatDate(request.reviewedAt) : 'N/A'}</small>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
						{:else if activeTab === 'rejected'}
							<!-- Rejected Requests -->
							{#if rejectedRequests.length === 0}
								<div class="text-center py-5 text-muted">
									<Icon name="x-circle" />
									<p class="mt-3">No rejected requests</p>
								</div>
							{:else}
								<div class="table-responsive">
									<table class="table table-striped table-hover mb-0">
										<thead>
											<tr>
												<th>Insult Text</th>
												<th>Submitted By</th>
												<th>Rejected</th>
											</tr>
										</thead>
										<tbody>
											{#each rejectedRequests as request (request.id)}
												<tr transition:fade>
													<td class="align-middle">"{request.text}"</td>
													<td class="align-middle">
														<div class="small">
															<div class="fw-semibold">{request.requestedByName || 'Anonymous'}</div>
															<div class="text-muted">{request.requestedByEmail || 'N/A'}</div>
														</div>
													</td>
													<td class="align-middle">
														<small class="text-muted">{request.reviewedAt ? formatDate(request.reviewedAt) : 'N/A'}</small>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
						{:else}
							<!-- Recent Activity -->
							{#if recentRequests.length === 0}
								<div class="text-center py-5 text-muted">
									<Icon name="list-ul" />
									<p class="mt-3">No recent activity</p>
								</div>
							{:else}
								<div class="table-responsive">
									<table class="table table-striped table-hover mb-0">
										<thead>
											<tr>
												<th>Insult Text</th>
												<th>Status</th>
												<th>Submitted By</th>
												<th>Created</th>
											</tr>
										</thead>
										<tbody>
											{#each recentRequests as request (request.id)}
												<tr transition:fade>
													<td class="align-middle">"{request.text}"</td>
													<td class="align-middle">
														{#if request.status === 'pending'}
															<span class="badge bg-warning">Pending</span>
														{:else if request.status === 'approved'}
															<span class="badge bg-success">Approved</span>
														{:else}
															<span class="badge bg-danger">Rejected</span>
														{/if}
													</td>
													<td class="align-middle">
														<div class="small">
															<div class="fw-semibold">{request.requestedByName || 'Anonymous'}</div>
															<div class="text-muted">{request.requestedByEmail || 'N/A'}</div>
														</div>
													</td>
													<td class="align-middle">
														<small class="text-muted">{formatDate(request.createdAt)}</small>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<Footer />
	</Auth>
</div>
