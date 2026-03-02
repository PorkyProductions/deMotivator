<script lang="ts">
	import { onMount } from 'svelte';
	import Auth from '../login/auth.svelte';
	import Footer from '../../components/footer.svelte';
	import Icon from '../../components/icon.svelte';
	import Title from '../../components/title.svelte';
	import AuthBenefitsDialog from '../../components/authBenefitsDialog.svelte';
	import { bsTheme } from '../../utils/darkMode';
	import {
		availableInsultPacks,
		exportSettingsJson,
		initSettingsListener,
		maxInsultWordsMax,
		maxInsultWordsMin,
		resolveEnabledPackKeys,
		resolveEnabledPackWeights,
		setUserSetting,
		setUserSettings,
		settingsStore,
		type UserSettings,
		type UserSettingKey
	} from '../../utils/userSettings';

	type ToggleSettingConfig = {
		key: UserSettingKey;
		title: string;
		icon: string;
		label: string;
		description: string;
		enableWarningMessage?: string;
	};

	type NumericSettingKey = {
		[K in UserSettingKey]: UserSettings[K] extends number ? K : never;
	}[UserSettingKey];

	type NumericSettingConfig = {
		key: NumericSettingKey;
		title: string;
		icon: string;
		label: string;
		description: string;
		min: number;
		max: number;
		step?: number;
	};

	type PackSettingConfig = (typeof availableInsultPacks)[number];

	const toggleSettings: ToggleSettingConfig[] = [
		{
			key: 'allowProfanity',
			title: 'Profanity',
			icon: 'explicit-fill',
			label: 'Allow profane insults',
			description: 'This setting applies across the app.',
			enableWarningMessage: 'Warning: Enabling profanity will include offensive content.'
		}
	];

	const numericSettings: NumericSettingConfig[] = [
		{
			key: 'maxInsultWords',
			title: 'Length Limit',
			icon: 'text-paragraph',
			label: 'Maximum words per insult',
			description: 'Insults longer than this are filtered out across the app (set to 0 for unlimited).',
			min: maxInsultWordsMin,
			max: maxInsultWordsMax,
			step: 1
		}
	];

	const getSettingInputId = (settingKey: UserSettingKey) => `${settingKey}Setting`;
	const getPackInputId = (packKey: string) => `${packKey}PackSetting`;
	const getPackWeightInputId = (packKey: string) => `${packKey}PackWeightSetting`;

	const isPackToggleDisabled = (pack: PackSettingConfig) => {
		const enabledPackKeys = resolveEnabledPackKeys($settingsStore);
		const isPackEnabled = enabledPackKeys.includes(pack.key);
		if (pack.explicit && !$settingsStore.allowProfanity) {
			return true;
		}
		if (!isPackEnabled) {
			return false;
		}
		return enabledPackKeys.length <= 1;
	};

	const handlePackSettingChange = async (pack: PackSettingConfig, event: Event) => {
		const target = event.target as HTMLInputElement;
		const enabledPackKeys = resolveEnabledPackKeys($settingsStore);
		const nextPackKeys = target.checked
			? Array.from(new Set(enabledPackKeys.concat(pack.key)))
			: enabledPackKeys.filter((enabledPackKey) => enabledPackKey !== pack.key);
		if (nextPackKeys.length === 0) {
			target.checked = true;
			alert('At least one insult pack must remain enabled.');
			return;
		}
		await setUserSetting('selectedPacks', nextPackKeys);
	};

	const handlePackWeightModeChange = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		await setUserSetting('usePackWeights', target.checked);
	};

	const handlePackWeightChange = async (pack: PackSettingConfig, event: Event) => {
		const enabledPackKeys = resolveEnabledPackKeys($settingsStore);
		if (!enabledPackKeys.includes(pack.key)) {
			return;
		}
		const target = event.target as HTMLInputElement;
		const parsedValue = Number.parseInt(target.value, 10);
		const fallbackValue = resolveEnabledPackWeights($settingsStore)[pack.key] ?? 0;
		const clampedValue = clampSettingNumber(Number.isFinite(parsedValue) ? parsedValue : fallbackValue, 0, 100);
		target.value = clampedValue.toString();
		await setUserSettings({
			packWeights: {
				...$settingsStore.packWeights,
				[pack.key]: clampedValue
			}
		});
	};

	const getCurrentPackWeightTotal = () => {
		return Object.values(resolveEnabledPackWeights($settingsStore)).reduce((total, weight) => total + weight, 0);
	};

	const handleToggleSettingChange = async (setting: ToggleSettingConfig, event: Event) => {
		const target = event.target as HTMLInputElement;
		const nextValue = target.checked;
		if (nextValue && setting.enableWarningMessage) {
			alert(setting.enableWarningMessage);
		}
		await setUserSetting(setting.key, nextValue);
	};

	const clampSettingNumber = (value: number, min: number, max: number) => {
		return Math.max(min, Math.min(max, value));
	};

	const handleNumberSettingChange = async (setting: NumericSettingConfig, event: Event) => {
		const target = event.target as HTMLInputElement;
		const parsedValue = Number.parseInt(target.value, 10);
		const fallbackValue = Number($settingsStore[setting.key]);
		const valueToSave = Number.isFinite(parsedValue) ? parsedValue : fallbackValue;
		const clampedValue = clampSettingNumber(valueToSave, setting.min, setting.max);
		target.value = clampedValue.toString();
		await setUserSetting(setting.key, clampedValue);
	};

	const downloadSettings = () => {
		if (typeof document === 'undefined') return;
		const settingsJson = exportSettingsJson($settingsStore);
		const blob = new Blob([settingsJson], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = 'demotivator-settings.json';
		anchor.click();
		URL.revokeObjectURL(url);
	};

	const saveSettings = async () => {
		await setUserSettings($settingsStore);
		alert('Settings saved.');
	};

	onMount(() => {
		initSettingsListener();
	});
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen bg-body">
	<Auth let:loggedIn>
		{#if loggedIn}
			<div class="bg-linear-to-br from-primary-subtle to-body-tertiary py-5 px-4 mb-5">
				<div class="container">
					<div class="text-center">
						<a href="/" class="text-decoration-none">
							<span class="display-6 fw-bold text-body">
								<Title />
							</span>
						</a>
						<h1 class="display-5 fw-bold mt-3 mb-2">
							<Icon name="gear-fill" /> Settings
						</h1>
					</div>
				</div>
			</div>

			<div class="container pb-5">
				<div class="row justify-content-center">
					<div class="col-lg-8">
						<div class="card border-0 shadow-sm mb-4">
							{#each toggleSettings as setting (setting.key)}
								<div class="card-body">
									<h2 class="h5 mb-3">
										<Icon name={setting.icon} /> {setting.title}
									</h2>
									<div class="form-check form-switch">
										<input
											class="form-check-input"
											type="checkbox"
											id={getSettingInputId(setting.key)}
											checked={$settingsStore[setting.key]}
											onchange={(event) => handleToggleSettingChange(setting, event)}
										/>
										<label class="form-check-label" for={getSettingInputId(setting.key)}>
											{setting.label}
										</label>
									</div>
									<p class="text-muted small mt-2 mb-0">
										{setting.description}
									</p>
								</div>
							{/each}
						</div>

						<div class="card border-0 shadow-sm mb-4">
							<div class="card-body">
								<h2 class="h5 mb-3">
									<Icon name="collection-fill" /> Insult Packs
								</h2>
								<p class="text-muted small mt-2 mb-3">
									Choose which packs to include in your insult pool.
								</p>
								<div class="border rounded p-2 bg-body-tertiary mb-3">
									<div class="d-flex align-items-center justify-content-between gap-2">
										<div>
											<p class="small fw-semibold mb-1">
												<Icon name="sliders" /> Advanced randomizer setting
											</p>
											<p class="text-muted small mb-0">
												Use percentage-based pack weighting for random insults.
											</p>
										</div>
										<div class="form-check mb-0">
											<input
												class="form-check-input"
												type="checkbox"
												id="packWeightModeSetting"
												aria-label="Enable advanced percentage-based pack weighting"
												checked={$settingsStore.usePackWeights}
												onchange={handlePackWeightModeChange}
											/>
											<label class="form-check-label small text-muted" for="packWeightModeSetting">
												Enable
											</label>
										</div>
									</div>
								</div>
								{#if $settingsStore.usePackWeights}
									<p class="text-muted small mt-2 mb-3">
										Pack weights are normalized to total 100%. Current normalized total: {getCurrentPackWeightTotal()}%.
									</p>
								{/if}
								<div class="d-flex flex-column gap-3">
									{#each availableInsultPacks as pack (pack.key)}
										<div class="form-check form-switch">
											<input
												class="form-check-input"
												type="checkbox"
												id={getPackInputId(pack.key)}
												checked={resolveEnabledPackKeys($settingsStore).includes(pack.key)}
												disabled={isPackToggleDisabled(pack)}
												onchange={(event) => handlePackSettingChange(pack, event)}
											/>
											<label class="form-check-label" for={getPackInputId(pack.key)}>
												{pack.title}
												{#if pack.explicit}
													<span class="badge text-bg-danger ms-2">Explicit</span>
												{/if}
											</label>
											{#if pack.explicit && !$settingsStore.allowProfanity}
												<p class="text-muted small mt-1 mb-0">
													Enable profanity to use this pack.
												</p>
											{/if}
											{#if $settingsStore.usePackWeights}
												<div class="d-flex flex-column flex-md-row gap-2 align-items-md-center mt-2 ms-4">
													<label class="form-label mb-0" for={getPackWeightInputId(pack.key)}>Weight %</label>
													<input
														class="form-range grow"
														type="range"
														id={getPackWeightInputId(pack.key)}
														min="0"
														max="100"
														step="1"
														value={resolveEnabledPackWeights($settingsStore)[pack.key] ?? 0}
														disabled={!resolveEnabledPackKeys($settingsStore).includes(pack.key)}
														onchange={(event) => handlePackWeightChange(pack, event)}
													/>
													<input
														class="form-control"
														type="number"
														min="0"
														max="100"
														step="1"
														value={resolveEnabledPackWeights($settingsStore)[pack.key] ?? 0}
														disabled={!resolveEnabledPackKeys($settingsStore).includes(pack.key)}
														onchange={(event) => handlePackWeightChange(pack, event)}
														style="max-width: 7rem;"
													/>
												</div>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						</div>

						<div class="card border-0 shadow-sm mb-4">
							{#each numericSettings as setting (setting.key)}
								<div class="card-body">
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
											value={$settingsStore[setting.key]}
											onchange={(event) => handleNumberSettingChange(setting, event)}
										/>
										<input
											class="form-control"
											type="number"
											min={setting.min}
											max={setting.max}
											step={setting.step ?? 1}
											value={$settingsStore[setting.key]}
											onchange={(event) => handleNumberSettingChange(setting, event)}
											style="max-width: 7rem;"
										/>
									</div>
									<p class="text-muted small mt-2 mb-0">
										{setting.description}
									</p>
								</div>
							{/each}
						</div>

						<div class="card border-0 shadow-sm">
							<div class="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
								<div>
									<h2 class="h5 mb-1">
										<Icon name="floppy-fill" /> Save or export settings
									</h2>
									<p class="text-muted small mb-0">
										Save to your account or download as JSON.
									</p>
								</div>
								<div class="d-flex flex-wrap gap-2">
									<button class="btn btn-primary" onclick={saveSettings}>
										<Icon name="floppy-fill" /> Save
									</button>
									<button class="btn btn-outline-primary" onclick={downloadSettings}>
										<Icon name="download" /> Export JSON
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="container py-5">
				<div class="row justify-content-center">
					<div class="col-lg-6">
						<div class="card border-0 shadow-lg">
							<div class="card-body text-center py-5">
								<div class="text-danger mb-4 text-4xl">
									<Icon name="lock-fill"/>
								</div>
								<h2 class="card-title fw-bold mb-3">Authentication Required</h2>
								<p class="card-text text-muted mb-4">
									Sign in to manage your settings and sync preferences across devices.
								</p>
								<div class="d-flex gap-3 justify-content-center">
									<a href="/login.html" class="btn btn-primary btn-lg shadow-sm">
										<Icon name="box-arrow-in-right" /> Sign In
									</a>
									<a href="/signUp.html" class="btn btn-outline-primary btn-lg">
										<Icon name="person-plus" /> Create Account
									</a>
								</div>
								<div class="mt-4 d-flex justify-content-center">
									<AuthBenefitsDialog
										modalId="settingsBenefitsDialog"
										buttonClass="btn btn-outline-info"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<Footer />
	</Auth>
</div>
