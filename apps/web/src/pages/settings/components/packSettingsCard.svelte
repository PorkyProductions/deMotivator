<script lang="ts">
	import { Icon } from '@demotivator/ui';
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

<div class="card border-0 shadow-sm mb-4 rounded-4 border-l-4 border-primary-majorelle-blue dark:border-primary-majorelle-blue">
	<div class="card-body p-0">
		<!-- Pack list -->
		<div class="px-4 pt-3 pb-2">
			<div class="d-flex align-items-center gap-2 mb-1">
				<div class="pack-section-icon">
					<Icon name="collection-fill" />
				</div>
				<span class="fw-semibold">Insult Packs</span>
			</div>
			{#if !settings.enablePackWeighting}
				<p class="text-muted small mb-3">
					Choose which packs to include in your insult pool.
				</p>
				<div class="row g-2">
					{#each availableInsultPacks as pack (pack.key)}
						<div class="col-12 col-sm-6">
							<label
								class={`pack-tile d-flex align-items-start gap-3 p-3 rounded-3 border cursor-pointer h-100 ${isPackEnabled(pack.key) ? 'pack-tile-active' : 'border-secondary-subtle'} ${isPackToggleDisabled(pack) ? 'pack-tile-disabled' : ''}`}
								for={getPackInputId(pack.key)}
							>
								<input
									class="form-check-input flex-shrink-0"
									style="margin-top: 0.2rem;"
									type="checkbox"
									id={getPackInputId(pack.key)}
									checked={isPackEnabled(pack.key)}
									disabled={isPackToggleDisabled(pack)}
									onchange={(event) => onPackSettingChange(pack, event)}
								/>
								<div class="min-w-0">
									<div class="fw-semibold text-truncate">{pack.title}</div>
									{#if pack.explicit}
										<span class="badge text-bg-danger rounded-pill mt-1">Explicit</span>
										{#if !settings.allowProfanity}
											<p class="text-muted small mt-1 mb-0">Enable profanity to use.</p>
										{/if}
									{/if}
								</div>
							</label>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-muted small mb-3">
					Set how much weighting each pack gets in random insult generation.
				</p>
				<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
					<span class="badge rounded-pill weight-total-badge">
						<Icon name="percent" /> Total: {getResolvedPackWeightTotal()}%
					</span>
					<button class="btn btn-outline-secondary btn-sm rounded-pill" onclick={resetPackWeightings}>
						<Icon name="arrow-counterclockwise" /> Reset weightings
					</button>
				</div>
				<div class="d-flex flex-column gap-2">
					{#each availableInsultPacks as pack (pack.key)}
						<div class={`pack-weight-row p-3 rounded-3 border border-secondary-subtle ${pack.explicit && !settings.allowProfanity ? 'opacity-50' : ''}`}>
							<div class="d-flex justify-content-between align-items-center gap-2 mb-2">
								<label class="form-label fw-semibold mb-0" for={getPackWeightInputId(pack.key)}>
									{pack.title}
									{#if pack.explicit}
										<span class="badge text-bg-danger ms-2 rounded-pill">Explicit</span>
									{/if}
								</label>
								<span class="badge rounded-pill weight-badge">
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
									Enable profanity to include this explicit pack.
								</p>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Advanced Pack Weighting toggle -->
		<div class="border-top border-secondary-subtle px-4 py-3">
			<div class="d-flex align-items-start gap-3">
				<div class="pack-section-icon flex-shrink-0 mt-1">
					<Icon name="sliders" />
				</div>
				<div class="grow">
					<div class="d-flex align-items-center justify-content-between gap-3">
						<div>
							<div class="fw-semibold">Advanced Pack Weighting</div>
							<p class="text-muted small mb-0">
								Enable percentage-based pack weighting for fine-grained control.
							</p>
						</div>
						<div class="form-check form-switch mb-0 flex-shrink-0">
							<input
								class="form-check-input"
								type="checkbox"
								id={getSettingInputId('enablePackWeighting')}
								checked={settings.enablePackWeighting}
								onchange={onPackWeightingToggleChange}
							/>
							<label class="form-check-label visually-hidden" for={getSettingInputId('enablePackWeighting')}>
								Enable percentage-based pack weighting
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.pack-section-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		background: rgb(79 70 229 / 10%);
		color: #4f46e5;
		font-size: 0.9rem;
		flex-shrink: 0;
	}

	:global([data-bs-theme='dark']) .pack-section-icon {
		background: rgb(79 70 229 / 22%);
		color: #818cf8;
	}

	.pack-tile {
		transition: border-color 0.15s ease, background-color 0.15s ease;
	}

	.pack-tile:hover:not(.pack-tile-disabled) {
		border-color: #4f46e5 !important;
		background-color: rgb(79 70 229 / 4%);
	}

	.pack-tile-active {
		border-color: #4f46e5 !important;
		background-color: rgb(79 70 229 / 5%);
	}

	:global([data-bs-theme='dark']) .pack-tile-active {
		border-color: #818cf8 !important;
		background-color: rgb(79 70 229 / 12%);
	}

	.pack-tile-disabled {
		opacity: 0.5;
		cursor: default;
	}

	.weight-badge {
		background: rgb(79 70 229 / 12%);
		color: #4f46e5;
		font-size: 0.75rem;
	}

	:global([data-bs-theme='dark']) .weight-badge {
		background: rgb(79 70 229 / 25%);
		color: #818cf8;
	}

	.weight-total-badge {
		background: rgb(79 70 229 / 12%);
		color: #4f46e5;
		font-size: 0.8rem;
	}

	:global([data-bs-theme='dark']) .weight-total-badge {
		background: rgb(79 70 229 / 25%);
		color: #818cf8;
	}

	.pack-weight-row {
		transition: background-color 0.15s ease;
	}
</style>
