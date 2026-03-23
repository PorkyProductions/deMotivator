<script lang="ts">
import { onMount } from 'svelte';
import { fade, fly } from 'svelte/transition';
import Auth from '../login/auth.svelte';
import Footer from '../../components/footer.svelte';
import { Icon } from '@demotivator/ui';
import Spinhog from '../../components/spinhog.svelte';
import { bsTheme } from '../../utils/darkMode';
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
import NotAuthenticatedView from './components/notAuthenticatedView.svelte';
import NotAdminView from './components/notAdminView.svelte';
import AdminDashboardHeader from './components/adminDashboardHeader.svelte';
import AdminStatsCards from './components/adminStatsCards.svelte';
import AdminCharts from './components/adminCharts.svelte';
import AdminRequestTabs from './components/adminRequestTabs.svelte';
import PendingRequestsTable from './components/pendingRequestsTable.svelte';
import ApprovedRequestsTable from './components/approvedRequestsTable.svelte';
import RejectedRequestsTable from './components/rejectedRequestsTable.svelte';
import RecentRequestsTable from './components/recentRequestsTable.svelte';

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
});

$effect(() => {
	if ($adminAccessStore.isAdmin) {
		loadRequests();
	}
});
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen dark:bg-theme-black">
<Auth let:loggedIn>
{#if $adminAccessStore.loading}
<div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-body backdrop-blur-sm">
<Spinhog />
</div>
{:else if !loggedIn || !$adminAccessStore.isAuthenticated}
<NotAuthenticatedView />
{:else if !$adminAccessStore.isAdmin}
<NotAdminView />
{:else}
<div transition:fade>
<AdminDashboardHeader {loading} onRefresh={loadRequests} />
</div>

<div class="container pb-5">
{#if error}
<div transition:fly={{ y: -20 }} class="alert alert-danger mb-4">
<Icon name="exclamation-triangle-fill" /> {error}
</div>
{/if}

<div transition:fly={{ y: 20, delay: 200 }}>
<AdminStatsCards
{totalUsers}
{totalInsultsSeen}
{pendingCount}
{approvedCount}
{rejectedCount}
/>
</div>

<div transition:fly={{ y: 20, delay: 250 }}>
<AdminCharts
{pendingCount}
{approvedCount}
{rejectedCount}
{pendingRequests}
{approvedRequests}
{rejectedRequests}
{bsTheme}
/>
</div>

<div class="card border-0 shadow-sm mb-4 border-l-4 border-primary-majorelle-blue dark:border-primary-majorelle-blue" transition:fly={{ y: 20, delay: 300 }}>
<div class="card-header bg-body-tertiary border-0">
<AdminRequestTabs
{activeTab}
{pendingCount}
{approvedCount}
{rejectedCount}
onTabChange={(tab) => activeTab = tab}
/>
</div>
<div class="card-body">
{#if activeTab === 'pending'}
<PendingRequestsTable
{pendingRequests}
{approvingIds}
{rejectingIds}
onApprove={handleApprove}
onReject={handleReject}
{formatDate}
/>
{:else if activeTab === 'approved'}
<ApprovedRequestsTable
{approvedRequests}
{approvedCount}
{loading}
onFlush={handleFlush}
{formatDate}
/>
{:else if activeTab === 'rejected'}
<RejectedRequestsTable
{rejectedRequests}
{formatDate}
/>
{:else}
<RecentRequestsTable
{recentRequests}
{formatDate}
/>
{/if}
</div>
</div>
</div>
{/if}

<Footer />
</Auth>
</div>
