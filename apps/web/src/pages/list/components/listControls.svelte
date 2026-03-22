<script lang="ts">
	import { Icon } from '@demotivator/ui';
	import { fly } from 'svelte/transition';

	type ViewMode = 'cards' | 'list';

	interface InsultPackOption {
		key: string;
		title: string;
		explicit: boolean;
	}

	interface Props {
		searchQuery: string;
		showFavoritesOnly: boolean;
		viewMode: ViewMode;
		availableInsultPacks: InsultPackOption[];
		selectedPackKeys: string[];
		allowProfanity: boolean;
		onShuffleInsults: () => void;
		onSearchQueryChange: (value: string) => void;
		onShowFavoritesOnlyChange: (value: boolean) => void;
		onViewModeChange: (value: ViewMode) => void;
		onPackSelectionChange: (packKeys: string[]) => void;
	}

	const {
		searchQuery,
		showFavoritesOnly,
		viewMode,
		availableInsultPacks,
		selectedPackKeys,
		allowProfanity,
		onShuffleInsults,
		onSearchQueryChange,
		onShowFavoritesOnlyChange,
		onViewModeChange,
		onPackSelectionChange
	}: Props = $props();

	const selectablePacks = $derived.by(() => {
		return availableInsultPacks.filter((pack) => allowProfanity || !pack.explicit);
	});

	const selectedPackKeySet = $derived(new Set(selectedPackKeys));
	const allPackKeys = $derived(selectablePacks.map((pack) => pack.key));
	const allPacksSelected = $derived(
		allPackKeys.length > 0 && allPackKeys.every((packKey) => selectedPackKeySet.has(packKey))
	);

	const toggleViewMode = () => {
		onViewModeChange(viewMode === 'cards' ? 'list' : 'cards');
	};

	const handleAllPackToggle = (event: Event) => {
		const target = event.currentTarget as HTMLInputElement;
		if (target.checked) {
			onPackSelectionChange(allPackKeys);
			return;
		}
		if (allPackKeys.length === 0) {
			onPackSelectionChange([]);
			return;
		}
		onPackSelectionChange([allPackKeys[0]]);
	};

	const handlePackToggle = (packKey: string, event: Event) => {
		const target = event.currentTarget as HTMLInputElement;
		const nextSelectedPackKeys = target.checked
			? Array.from(new Set([...selectedPackKeys, packKey]))
			: selectedPackKeys.filter((selectedPackKey) => selectedPackKey !== packKey);
		onPackSelectionChange(nextSelectedPackKeys);
	};
</script>

<div class="card border-0 shadow-sm mb-4 border-l-4 border-primary-majorelle-blue dark:border-primary-majorelle-blue controlsCard" transition:fly={{ y: 20, delay: 300 }}>
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
				<div class="d-grid gap-2">
					<details class="position-relative packSelectDetails">
						<summary class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-between list-style-none">
							<span><Icon name="collection" /> Packs</span>
							<span class="small text-muted">{selectedPackKeys.length}/{allPackKeys.length || 1}</span>
						</summary>
						<div class="dropdown-menu show w-100 mt-2 p-3 shadow-sm packSelectDropdownMenu">
							<div class="form-check mb-2">
								<input
									type="checkbox"
									class="form-check-input"
									id="allPacksCheck"
									checked={allPacksSelected}
									onchange={handleAllPackToggle}
								/>
								<label class="form-check-label fw-semibold" for="allPacksCheck">
									All
								</label>
							</div>
							<hr class="my-2" />
							<div class="d-flex flex-column gap-2">
								{#each selectablePacks as pack (pack.key)}
									<div class="form-check">
										<input
											type="checkbox"
											class="form-check-input"
											id={`listPack_${pack.key}`}
											checked={selectedPackKeySet.has(pack.key)}
											onchange={(event) => handlePackToggle(pack.key, event)}
										/>
										<label class="form-check-label" for={`listPack_${pack.key}`}>
											{pack.title}
											{#if pack.explicit}
												<span class="badge text-bg-danger ms-2">Explicit</span>
											{/if}
										</label>
									</div>
								{/each}
							</div>
						</div>
					</details>
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

<style>
	.controlsCard {
		position: relative;
		z-index: 10;
	}

	.packSelectDetails {
		z-index: 1;
	}

	.packSelectDetails[open] {
		z-index: 2200;
	}

	.packSelectDropdownMenu {
		z-index: 2300;
	}
</style>
