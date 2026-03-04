<script lang="ts">
import { fly } from 'svelte/transition';

interface Props {
totalCount: number;
filteredCount: number;
favoriteCount: number;
currentPage: number;
totalPages: number;
}

const { totalCount, filteredCount, favoriteCount, currentPage, totalPages }: Props = $props();
</script>

<div class="row g-3 mb-4" transition:fly={{ y: 20, delay: 200 }}>
<div class="col-md-3 col-6">
<div class="card border-0 shadow-sm">
<div class="card-body text-center py-3">
<div class="text-primary small mb-1">Total</div>
<div class="h4 mb-0 fw-bold">{totalCount}</div>
</div>
</div>
</div>
<div class="col-md-3 col-6">
<div class="card border-0 shadow-sm">
<div class="card-body text-center py-3">
<div class="text-success small mb-1">Filtered</div>
<div class="h4 mb-0 fw-bold">{filteredCount}</div>
</div>
</div>
</div>
<div class="col-md-3 col-6">
<div class="card border-0 shadow-sm">
<div class="card-body text-center py-3">
<div class="text-warning small mb-1">Favorites</div>
<div class="h4 mb-0 fw-bold">{favoriteCount}</div>
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
