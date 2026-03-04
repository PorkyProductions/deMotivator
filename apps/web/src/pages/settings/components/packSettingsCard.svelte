<script lang="ts">
	import Icon from '../../../components/icon.svelte';
	import type { UserSettingKey, UserSettings } from '../../../utils/userSettings';
	import type { PackSettingConfig } from './settingsTypes';

	const {
		availableInsultPacks,
		settings,
		getSettingInputId,
		getPackInputId,
		getPackWeightInputId,
		isPackEnabled,
		isPackToggleDisabled,
		onPackSettingChange,
		onPackWeightSettingChange,
		onPackWeightingToggleChange,
		resetPackWeightings,
		getResolvedPackWeight,
		getResolvedPackWeightTotal
	}: {
		availableInsultPacks: PackSettingConfig[];
		settings: UserSettings;
		getSettingInputId: (settingKey: UserSettingKey) => string;
		getPackInputId: (packKey: string) => string;
		getPackWeightInputId: (packKey: string) => string;
		isPackEnabled: (packKey: string) => boolean;
		isPackToggleDisabled: (pack: PackSettingConfig) => boolean;
		onPackSettingChange: (pack: PackSettingConfig, event: Event) => Promise<void>;
		onPackWeightSettingChange: (pack: PackSettingConfig, event: Event) => Promise<void>;
		onPackWeightingToggleChange: (event: Event) => Promise<void>;
		resetPackWeightings: () => Promise<void>;
		getResolvedPackWeight: (packKey: string) => number;
		getResolvedPackWeightTotal: () => number;
	} = $props();
</script>

<div class="card border-0 shadow-sm mb-4">
	<div class="card-body">
		<h2 class="h5 mb-3">
			<Icon name="collection-fill" /> Insult Packs
		</h2>
		{#if !settings.enablePackWeighting}
			<p class="text-muted small mt-2 mb-3">
				Choose which packs to include in your insult pool.
			</p>
			<div class="d-flex flex-column gap-3">
				{#each availableInsultPacks as pack (pack.key)}
					<div class="form-check form-switch">
						<input
							class="form-check-input"
							type="checkbox"
							id={getPackInputId(pack.key)}
							checked={isPackEnabled(pack.key)}
							disabled={isPackToggleDisabled(pack)}
							onchange={(event) => onPackSettingChange(pack, event)}
						/>
						<label class="form-check-label" for={getPackInputId(pack.key)}>
							{pack.title}
							{#if pack.explicit}
								<span class="badge text-bg-danger ms-2">Explicit</span>
							{/if}
						</label>
						{#if pack.explicit && !settings.allowProfanity}
							<p class="text-muted small mt-1 mb-0">
								Enable profanity to use this pack.
							</p>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-muted small mt-2 mb-3">
				Set how much weighting each pack gets in random insult generation.
			</p>
			<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
				<p class="text-muted small mt-0 mb-0">
					Effective weighting total: {getResolvedPackWeightTotal()}%
				</p>
				<button class="btn btn-outline-secondary btn-sm" onclick={resetPackWeightings}>
					<Icon name="arrow-counterclockwise" /> Reset weightings
				</button>
			</div>
			<div class="d-flex flex-column gap-3">
				{#each availableInsultPacks as pack (pack.key)}
					<div class="border rounded p-3">
						<div class="d-flex justify-content-between align-items-center gap-2 mb-2">
							<label class="form-label mb-0" for={getPackWeightInputId(pack.key)}>
								{pack.title}
								{#if pack.explicit}
									<span class="badge text-bg-danger ms-2">Explicit</span>
								{/if}
							</label>
							<span class="badge text-bg-primary">
								{getResolvedPackWeight(pack.key)}%
							</span>
						</div>
						<div class="d-flex flex-column flex-md-row gap-3 align-items-md-center">
							<input
								class="form-range grow"
								type="range"
								id={getPackWeightInputId(pack.key)}
								min="0"
								max="100"
								step="1"
								value={settings.packWeights[pack.key] ?? 0}
								disabled={pack.explicit && !settings.allowProfanity}
								onchange={(event) => onPackWeightSettingChange(pack, event)}
							/>
							<input
								class="form-control"
								type="number"
								min="0"
								max="100"
								step="1"
								value={settings.packWeights[pack.key] ?? 0}
								disabled={pack.explicit && !settings.allowProfanity}
								onchange={(event) => onPackWeightSettingChange(pack, event)}
								style="max-width: 7rem;"
							/>
						</div>
						{#if pack.explicit && !settings.allowProfanity}
							<p class="text-muted small mt-2 mb-0">
								Enable profanity to include this explicit pack in weighting.
							</p>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
		<hr class="my-4" />
		<h2 class="h5 mb-3">
			<Icon name="sliders" /> Advanced Pack Weighting
		</h2>
		<div class="form-check form-switch">
			<input
				class="form-check-input"
				type="checkbox"
				id={getSettingInputId('enablePackWeighting')}
				checked={settings.enablePackWeighting}
				onchange={onPackWeightingToggleChange}
			/>
			<label class="form-check-label" for={getSettingInputId('enablePackWeighting')}>
				Enable percentage-based pack weighting
			</label>
		</div>
		<p class="text-muted small mt-2 mb-0">
			When disabled, the app uses the standard selected packs behavior.
		</p>
	</div>
</div>
