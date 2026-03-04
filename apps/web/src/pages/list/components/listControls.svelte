<script lang="ts">
import Icon from '../../../components/icon.svelte';
import { fly } from 'svelte/transition';

type ViewMode = 'cards' | 'list';

	interface Props {
		searchQuery: string;
		showFavoritesOnly: boolean;
		viewMode: ViewMode;
		onShuffleInsults: () => void;
		onSearchQueryChange: (value: string) => void;
		onShowFavoritesOnlyChange: (value: boolean) => void;
		onViewModeChange: (value: ViewMode) => void;
	}

	const {
		searchQuery,
		showFavoritesOnly,
		viewMode,
		onShuffleInsults,
		onSearchQueryChange,
		onShowFavoritesOnlyChange,
		onViewModeChange
	}: Props = $props();

	const toggleViewMode = () => {
		onViewModeChange(viewMode === 'cards' ? 'list' : 'cards');
	};
</script>

<div class="card border-0 shadow-sm mb-4" transition:fly={{ y: 20, delay: 300 }}>
<div class="card-body">
<div class="row g-3">
<div class="col-lg-4">
<div class="input-group">
<span class="input-group-text">
<Icon name="search" />
</span>
					<input
						type="text"
						class="form-control"
						placeholder="Search insults..."
						value={searchQuery}
						oninput={(event) => onSearchQueryChange((event.currentTarget as HTMLInputElement).value)}
					/>
					{#if searchQuery}
						<button
							class="btn btn-outline-secondary"
							onclick={() => onSearchQueryChange('')}
						>
							<Icon name="x-lg" />
						</button>
{/if}
</div>
</div>
<div class="col-lg-4">
<div class="btn-group w-100" role="group">
					<input
						type="checkbox"
						class="btn-check"
						id="favCheck"
						checked={showFavoritesOnly}
						onchange={(event) => onShowFavoritesOnlyChange((event.currentTarget as HTMLInputElement).checked)}
					/>
<label class="btn btn-outline-warning" for="favCheck">
<Icon name="star-fill" /> Favorites
</label>
</div>
</div>
<div class="col-lg-4">
<div class="btn-group w-100" role="group">
<button
class="btn btn-outline-primary"
onclick={onShuffleInsults}
>
<Icon name="shuffle" /> Shuffle
</button>
<button
class="btn btn-outline-secondary"
onclick={toggleViewMode}
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
