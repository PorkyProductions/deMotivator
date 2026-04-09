<script lang="ts">
	import { onMount } from 'svelte';
	import Auth from '../login/auth.svelte';
	import Footer from '../../components/footer.svelte';
	import { Icon } from '@demotivator/ui';
	import Title from '../../components/title.svelte';
	import AuthBenefitsDialog from '../../components/authBenefitsDialog.svelte';
	import SectionHeader from './components/sectionHeader.svelte';
	import ContentSettingsCard from './components/contentSettingsCard.svelte';
	import PackSettingsCard from './components/packSettingsCard.svelte';
	import SettingsDataCard from './components/settingsDataCard.svelte';
	import type { NumericSettingConfig, PackSettingConfig, ToggleSettingConfig } from './components/settingsTypes';
	import { bsTheme } from '../../utils/darkMode';
	import {
		availableInsultPacks,
		createEvenPackWeights,
		exportSettingsJson,
		initSettingsListener,
		maxInsultWordsMax,
		maxInsultWordsMin,
		resolveEnabledPackKeys,
		resolveWeightedPackEntries,
		setUserSetting,
		setUserSettings,
		settingsStore,
		type UserSettingKey
	} from '../../utils/userSettings';

	const toggleSettings: ToggleSettingConfig[] = [
		{
			key: 'allowProfanity',
			title: 'Profanity',
			icon: 'explicit-fill',
			label: 'Allow profane insults',
			description: 'This setting applies across the app.',
			enableWarningMessage: 'Warning: Enabling profanity will include offensive content.'
		},
		{
			key: 'censorProfanity',
			title: 'Profanity Censor',
			icon: 'hash',
			label: 'Censor profane words with #',
			description: 'When profanity is enabled, profane words are masked with # across display and sharing.',
			requiresProfanity: true
		},
		{
			key: 'angryMode',
			title: 'Angry Mode',
			icon: 'emoji-angry-fill',
			label: 'Enable angry text mode',
			description: 'Converts insults to uppercase with randomized 1-7 exclamation points across display and sharing.'
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
			? (enabledPackKeys.includes(pack.key) ? enabledPackKeys : enabledPackKeys.concat(pack.key))
			: enabledPackKeys.filter((enabledPackKey) => enabledPackKey !== pack.key);
		if (nextPackKeys.length === 0) {
			target.checked = true;
			alert('At least one insult pack must remain enabled.');
			return;
		}
		await setUserSetting('selectedPacks', nextPackKeys);
	};

	const clampPackWeight = (value: number) => {
		return Math.max(0, Math.min(100, value));
	};

	const handlePackWeightSettingChange = async (pack: PackSettingConfig, event: Event) => {
		const target = event.target as HTMLInputElement;
		const parsedValue = Number.parseInt(target.value, 10);
		const fallbackValue = Number($settingsStore.packWeights[pack.key] ?? 0);
		const valueToSave = Number.isFinite(parsedValue) ? parsedValue : fallbackValue;
		const clampedValue = clampPackWeight(valueToSave);
		target.value = clampedValue.toString();
		await setUserSetting('packWeights', {
			...$settingsStore.packWeights,
			[pack.key]: clampedValue
		});
	};

	const handlePackWeightingToggleChange = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		await setUserSetting('enablePackWeighting', target.checked);
	};

	const resetPackWeightings = async () => {
		const allowedPackKeys = availableInsultPacks
			.filter((pack) => $settingsStore.allowProfanity || !pack.explicit)
			.map((pack) => pack.key);
		const fallbackPackKey = resolveEnabledPackKeys($settingsStore)[0];
		const nextPackKeys = allowedPackKeys.length > 0 ? allowedPackKeys : [fallbackPackKey];
		const nextPackWeights = createEvenPackWeights(nextPackKeys, fallbackPackKey);
		await setUserSetting('packWeights', nextPackWeights);
	};

	const getResolvedPackWeight = (packKey: string) => {
		const weightedPackEntry = resolveWeightedPackEntries($settingsStore).find((entry) => entry.key === packKey);
		return weightedPackEntry?.weight ?? 0;
	};

	const getResolvedPackWeightTotal = () => {
		return resolveWeightedPackEntries($settingsStore).reduce((sum, entry) => sum + entry.weight, 0);
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

<div id="root" data-bs-theme={bsTheme} class="min-h-screen dark:bg-theme-black">
	<Auth let:loggedIn>
		{#if loggedIn}
			<div class="settings-hero py-10 px-4 mb-2">
				<div class="container">
					<div class="text-center">
						<a href="/" class="text-decoration-none">
							<span class="display-6 fw-bold text-body">
								<Title />
							</span>
						</a>
						<div class="hero-badge mx-auto mt-3 mb-2">
						</div>
						<h1 class="display-3 fw-bold mb-2 settings-title">
							Settings
						</h1>
					</div>
				</div>
			</div>

			<div class="container pb-5">
				<div class="row justify-content-center">
					<div class="col-lg-8">
						<SectionHeader
							icon="sliders2"
							title="Content Settings"
							description="Control filtering and content behavior across the app."
							step={1}
						/>
						<ContentSettingsCard
							toggleSettings={toggleSettings}
							numericSettings={numericSettings}
							settings={$settingsStore}
							getSettingInputId={getSettingInputId}
							onToggleSettingChange={handleToggleSettingChange}
							onNumberSettingChange={handleNumberSettingChange}
						/>

						<SectionHeader
							icon="shuffle"
							title="Insult Pool Settings"
							description="Control which packs are used and how random weighting is applied."
							step={2}
						/>
						<PackSettingsCard
							availableInsultPacks={availableInsultPacks}
							settings={$settingsStore}
							getSettingInputId={getSettingInputId}
							getPackInputId={getPackInputId}
							getPackWeightInputId={getPackWeightInputId}
							isPackEnabled={(packKey) => resolveEnabledPackKeys($settingsStore).includes(packKey)}
							isPackToggleDisabled={isPackToggleDisabled}
							onPackSettingChange={handlePackSettingChange}
							onPackWeightSettingChange={handlePackWeightSettingChange}
							onPackWeightingToggleChange={handlePackWeightingToggleChange}
							resetPackWeightings={resetPackWeightings}
							getResolvedPackWeight={getResolvedPackWeight}
							getResolvedPackWeightTotal={getResolvedPackWeightTotal}
						/>

						<SectionHeader
							icon="person-circle"
							title="Profile Settings Data"
							description="Save your current settings or export them as a JSON file."
							step={3}
						/>
						<SettingsDataCard onSaveSettings={saveSettings} onDownloadSettings={downloadSettings} />
					</div>
				</div>
			</div>
		{:else}
			<div class="container py-5">
				<div class="row justify-content-center">
					<div class="col-lg-6">
						<div class="card border-0 shadow-lg rounded-4">
							<div class="card-body text-center py-5">
								<div class="auth-lock-icon mx-auto mb-4">
									<Icon name="lock-fill"/>
								</div>
								<h2 class="card-title fw-bold mb-3">Authentication Required</h2>
								<p class="card-text text-muted mb-4">
									Sign in to manage your settings and sync preferences across devices.
								</p>
								<div class="d-flex gap-3 justify-content-center">
									<a href="/login.html" class="btn btn-primary btn-lg shadow-sm rounded-pill px-4">
										<Icon name="box-arrow-in-right" /> Sign In
									</a>
									<a href="/signUp.html" class="btn btn-outline-primary btn-lg rounded-pill px-4">
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

<style>
	.settings-hero {
		position: relative;
	}

	.settings-title {
		background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	:global([data-bs-theme='dark']) .settings-title {
		background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.auth-lock-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: rgb(79 70 229 / 12%);
		color: #4f46e5;
		font-size: 2rem;
	}

	:global([data-bs-theme='dark']) .auth-lock-icon {
		background: rgb(79 70 229 / 25%);
		color: #818cf8;
	}
</style>
