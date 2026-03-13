<script lang="ts">
import { Icon } from '@demotivator/ui';
import { flip } from 'svelte/animate';
import { fade, scale } from 'svelte/transition';

type ViewMode = 'cards' | 'list';

interface Props {
filteredInsults: string[];
paginatedInsults: string[];
viewMode: ViewMode;
favoriteInsults: Set<string>;
currentPage: number;
totalPages: number;
getPaginationRange: () => number[];
goToPage: (page: number) => void;
onCopyToClipboard: (insult: string) => Promise<void>;
onOpenShareDialog: (insult: string) => void;
onToggleFavorite: (insult: string) => Promise<void>;
onClearFilters: () => void;
}

const {
	filteredInsults,
	paginatedInsults,
	viewMode,
	favoriteInsults,
	currentPage,
	totalPages,
	getPaginationRange,
	goToPage,
	onCopyToClipboard,
	onOpenShareDialog,
	onToggleFavorite,
	onClearFilters
}: Props = $props();
</script>

{#if filteredInsults.length > 0}
{#if viewMode === 'cards'}
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
onclick={() => onCopyToClipboard(insult)}
title="Copy"
>
<Icon name="clipboard" />
</button>
<button
class="btn btn-sm btn-outline-info"
onclick={() => onOpenShareDialog(insult)}
title="Share"
>
<Icon name="share" />
</button>
<button
class={`btn btn-sm ${favoriteInsults.has(insult) ? 'btn-warning' : 'btn-outline-warning'}`}
onclick={() => onToggleFavorite(insult)}
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
onclick={() => onCopyToClipboard(insult)}
title="Copy"
>
<Icon name="clipboard" />
</button>
<button
class="btn btn-sm btn-outline-info"
onclick={() => onOpenShareDialog(insult)}
title="Share"
>
<Icon name="share" />
</button>
<button
class={`btn btn-sm ${favoriteInsults.has(insult) ? 'btn-warning' : 'btn-outline-warning'}`}
onclick={() => onToggleFavorite(insult)}
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
onclick={onClearFilters}
>
<Icon name="arrow-clockwise" /> Clear Filters
</button>
</div>
</div>
{/if}
