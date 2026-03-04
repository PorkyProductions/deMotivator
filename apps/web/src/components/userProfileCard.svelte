<script>
	import BsButton from './bsButton.svelte';
	import BsModal from './bs-modal.svelte';
	import { darkMode } from '../utils/darkMode';
	import { launchConfetti } from '../utils/loginHandlers';
	import { onMount } from 'svelte';
    import Icon from './icon.svelte';

	const LOADING_PLACEHOLDER = '...';

	const {
		user,
		insultsSeenDB,
		insultStreakDB,
		achievementsDB,
		onRefreshInsultsSeen,
		onLogout,
		onDeleteAccount
	} = $props();

	// Load profile data on mount
	onMount(() => {
		if (
			insultsSeenDB === LOADING_PLACEHOLDER
			|| insultStreakDB === LOADING_PLACEHOLDER
			|| achievementsDB === LOADING_PLACEHOLDER
		) {
			onRefreshInsultsSeen();
		}
	});
</script>

<div class="card shadow-lg border-0 rounded-4 overflow-hidden">
	<div class="card-body p-5 text-center">
		<div class="mb-4 position-relative d-inline-block">
			<img
				src={user.picture || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.id}`}
				alt="User Profile"
				class="rounded-circle shadow-sm border-3 border-white"
				style="width: 120px; height: 120px; object-fit: cover;"
				draggable="false"
			/>
		</div>
		<h2 class="card-title fw-bold mb-1">
			Hello, <span class="text-primary-majorelle-blue dark:text-primary-majorelle-blue">{user.name ?? 'Guest'}</span>
		</h2>
		<p class="card-text text-muted font-monospace mb-4">{user.email}</p>

		<div class="row g-3 mb-4">
			<div class="col-md-4 col-6">
				<div class="p-3 bg-body-tertiary rounded-3">
					<small class="text-uppercase text-secondary fw-bold d-block"> <Icon name="chat-quote" /> Insults Seen</small>
					<span class="fs-4 fw-bold">{insultsSeenDB ?? 0}</span>
				</div>
			</div>
			<div class="col-md-4 col-6">
				<div class="p-3 bg-body-tertiary rounded-3">
					<small class="text-uppercase fw-bold d-block text-theme-orange"> <Icon name="fire"/>  Current Streak</small>
					<span class="fs-4 fw-bold text-theme-orange">{insultStreakDB ?? 0}</span>
				</div>
			</div>
			<div class="col-md-4 col-12">
				<div class="p-3 bg-body-tertiary rounded-3">
					<small class="text-uppercase text-secondary fw-bold d-block"> <Icon name="braces"/>  User ID</small>
					<span class="font-monospace text-break d-block" title={user.id}>{user.id}</span>
				</div>
			</div>
		</div>

		<details class="mb-4 text-start p-3 rounded-3 border border-secondary-subtle bg-body" open>
			<summary class="h5 fw-bold mb-3 cursor-pointer">
				<Icon name="award-fill" /> Acheivements
			</summary>
			{#if Array.isArray(achievementsDB)}
				<div class="d-flex flex-column gap-2">
					{#each achievementsDB as achievement (achievement.id)}
						<div class={`p-3 rounded-3 border ${achievement.earned ? 'bg-body-tertiary border-primary-subtle' : 'bg-body-secondary border-secondary-subtle opacity-50'}`}>
							<div class="d-flex justify-content-between align-items-center mb-1">
								<div class="fw-semibold">{achievement.emoji} {achievement.title}</div>
								{#if !achievement.earned}
									<span class="badge text-bg-secondary">Locked</span>
								{/if}
							</div>
							<p class="text-muted small mb-0">{achievement.description}</p>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-muted mb-0">Loading acheivements...</p>
			{/if}
		</details>

		<button class="btn btn-primary btn-lg w-100 rounded-3 mb-3" onclick={launchConfetti}>
			<i class="bi bi-heart-fill me-2"></i> Launch Confetti
		</button>

		<div class="d-flex gap-2 justify-content-center mb-4">
			<BsButton href="/list.html" type="secondary" text="All Insults" icon="binoculars" />
			<div onclick={onRefreshInsultsSeen} onkeypress={onRefreshInsultsSeen} role="button" tabindex="0">
				<BsButton href="#" type={darkMode ? 'dark' : 'light'} text="Refresh Stats" icon="arrow-clockwise" />
			</div>
		</div>

		<hr class="my-4 text-secondary">

		<div class="d-flex justify-content-between align-items-center">
			<button onclick={onLogout} class="btn btn-link text-decoration-none text-secondary fw-semibold p-0">
				<i class="bi bi-box-arrow-left me-1"></i> Sign Out
			</button>
			<BsModal
				preButtonText="Delete Account"
				preButtonType="danger"
				preButtonIcon="person-x"
				title="Delete Account?"
				body="Once an account is deleted, it cannot be undone, and any data associated with that account will be forever lost. Be absolutely sure."
				confirmButtonType="danger"
				confirmButtonText="Yes, Delete Account"
				confirmButtonAction={onDeleteAccount}
				closeButtonType="secondary"
				closeButtonText="Back to safety"
			/>
		</div>
	</div>
</div>
