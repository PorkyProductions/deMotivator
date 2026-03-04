<script lang="ts">
interface Props {
totalUsers: number;
totalInsultsSeen: number;
pendingCount: number;
approvedCount: number;
rejectedCount: number;
}

const {
	totalUsers,
	totalInsultsSeen,
	pendingCount,
	approvedCount,
	rejectedCount
}: Props = $props();
</script>

<div class="row g-3 mb-4">
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
