<script lang="ts">
	import { Icon } from '@demotivator/ui';
	import type { UserSettingKey, UserSettings } from '../../../utils/userSettings';
	import type { NumericSettingConfig, ToggleSettingConfig } from './settingsTypes';

	const {
		toggleSettings,
		numericSettings,
		settings,
		getSettingInputId,
		onToggleSettingChange,
		onNumberSettingChange
	}: {
		toggleSettings: ToggleSettingConfig[];
		numericSettings: NumericSettingConfig[];
		settings: UserSettings;
		getSettingInputId: (settingKey: UserSettingKey) => string;
		onToggleSettingChange: (setting: ToggleSettingConfig, event: Event) => Promise<void>;
		onNumberSettingChange: (setting: NumericSettingConfig, event: Event) => Promise<void>;
	} = $props();
</script>

<div class="card border-0 shadow-sm mb-4 rounded-4 border-l-4 border-primary-majorelle-blue dark:border-primary-majorelle-blue">
	<div class="card-body p-0">
		{#each toggleSettings as setting, index (setting.key)}
			<div class={`setting-row px-4 py-3 ${index > 0 ? 'border-top border-secondary-subtle' : ''} ${setting.requiresProfanity && !settings.allowProfanity ? 'opacity-50' : ''}`}>
				<div class="d-flex align-items-center gap-3">
					<div class="setting-icon-wrap flex-shrink-0">
						<Icon name={setting.icon} />
					</div>
					<div class="grow min-w-0">
						<div class="fw-semibold">{setting.title}</div>
						<div class="text-muted small">{setting.description}</div>
						{#if setting.requiresProfanity && !settings.allowProfanity}
							<div class="text-muted small fst-italic mt-1">Enable profanity to use this setting.</div>
						{/if}
					</div>
					<div class="flex-shrink-0">
						<div class="form-check form-switch mb-0">
							<input
								class="form-check-input"
								type="checkbox"
								id={getSettingInputId(setting.key)}
								checked={settings[setting.key] as boolean}
								disabled={setting.requiresProfanity && !settings.allowProfanity}
								onchange={(event) => onToggleSettingChange(setting, event)}
							/>
							<label class="form-check-label visually-hidden" for={getSettingInputId(setting.key)}>
								{setting.label}
							</label>
						</div>
					</div>
				</div>
			</div>
		{/each}

		<div class="border-top border-secondary-subtle px-4 py-3">
			{#each numericSettings as setting (setting.key)}
				<div class="d-flex align-items-start gap-3">
					<div class="setting-icon-wrap flex-shrink-0 mt-1">
						<Icon name={setting.icon} />
					</div>
					<div class="grow">
						<div class="fw-semibold mb-1">{setting.title}</div>
						<label class="form-label text-muted small mb-2" for={getSettingInputId(setting.key)}>
							{setting.label}
						</label>
						<div class="d-flex flex-column flex-md-row gap-3 align-items-md-center">
							<input
								class="form-range grow"
								type="range"
								id={getSettingInputId(setting.key)}
								min={setting.min}
								max={setting.max}
								step={setting.step ?? 1}
								value={settings[setting.key] as number}
								onchange={(event) => onNumberSettingChange(setting, event)}
							/>
							<input
								class="form-control"
								type="number"
								min={setting.min}
								max={setting.max}
								step={setting.step ?? 1}
								value={settings[setting.key] as number}
								onchange={(event) => onNumberSettingChange(setting, event)}
								style="max-width: 7rem;"
							/>
						</div>
						<p class="text-muted small mt-2 mb-0">
							{setting.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.setting-row {
		transition: background-color 0.15s ease;
	}

	.setting-row:hover {
		background-color: rgb(79 70 229 / 3%);
	}

	.setting-icon-wrap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: rgb(79 70 229 / 10%);
		color: #4f46e5;
		font-size: 1rem;
	}

	:global([data-bs-theme='dark']) .setting-icon-wrap {
		background: rgb(79 70 229 / 22%);
		color: #818cf8;
	}
</style>
