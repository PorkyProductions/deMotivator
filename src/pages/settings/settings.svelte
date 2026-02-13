<script lang="ts">
	import '../../styles/css/app.css';
	import '../../styles/scss/colorScheme.scss';
	import { onMount } from 'svelte';
	import Auth from '../login/auth.svelte';
	import Footer from '../../components/footer.svelte';
	import Icon from '../../components/icon.svelte';
	import Title from '../../components/title.svelte';
	import { bsTheme } from '../../utils/darkMode';
	import { exportSettingsJson, initSettingsListener, setUserSettings, settingsStore } from '../../utils/userSettings';

	const handleProfanityToggle = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		const allowProfanity = target.checked;
		if (allowProfanity) {
			alert('Warning: Enabling profanity will include offensive content.');
		}
		await setUserSettings({ allowProfanity: allowProfanity });
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
							<div class="card-body">
								<h2 class="h5 mb-3">
									<Icon name="explicit-fill" /> Profanity
								</h2>
								<div class="form-check form-switch">
									<input
										class="form-check-input"
										type="checkbox"
										id="allowProfanitySetting"
										checked={$settingsStore.allowProfanity}
										onchange={handleProfanityToggle}
									/>
									<label class="form-check-label" for="allowProfanitySetting">
										Allow profane insults
									</label>
								</div>
								<p class="text-muted small mt-2 mb-0">
									This setting applies across the app.
								</p>
							</div>
						</div>

						<div class="card border-0 shadow-sm">
							<div class="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
								<div>
									<h2 class="h5 mb-1">
										<Icon name="download" /> Export settings
									</h2>
									<p class="text-muted small mb-0">
										Download your settings as JSON.
									</p>
								</div>
								<button class="btn btn-outline-primary" onclick={downloadSettings}>
									<Icon name="download" /> Export JSON
								</button>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<Footer />
	</Auth>
</div>
