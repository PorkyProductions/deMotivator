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

<div class="card border-0 shadow-sm mb-4">
	<div class="card-body">
		{#each toggleSettings as setting, index (setting.key)}
			<div class={index > 0 ? 'mt-4' : ''}>
				<h2 class="h5 mb-3">
					<Icon name={setting.icon} /> {setting.title}
				</h2>
				<div class="form-check form-switch">
					<input
						class="form-check-input"
						type="checkbox"
						id={getSettingInputId(setting.key)}
						checked={settings[setting.key] as boolean}
						disabled={setting.requiresProfanity && !settings.allowProfanity}
						onchange={(event) => onToggleSettingChange(setting, event)}
					/>
					<label class="form-check-label" for={getSettingInputId(setting.key)}>
						{setting.label}
					</label>
				</div>
				<p class="text-muted small mt-2 mb-0">
					{setting.description}
				</p>
				{#if setting.requiresProfanity && !settings.allowProfanity}
					<p class="text-muted small mt-1 mb-0">
						Enable profanity to use this setting.
					</p>
				{/if}
			</div>
		{/each}
		<hr class="my-4" />
		{#each numericSettings as setting (setting.key)}
			<div>
				<h2 class="h5 mb-3">
					<Icon name={setting.icon} /> {setting.title}
				</h2>
				<label class="form-label" for={getSettingInputId(setting.key)}>
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
		{/each}
	</div>
</div>
