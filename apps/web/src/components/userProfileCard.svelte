<script>
	import { BsModal } from '@demotivator/ui';
	import { launchConfetti } from '../utils/loginHandlers';
	import { darkMode } from '../utils/darkMode';
	import { onMount } from 'svelte';
	import { Icon } from '@demotivator/ui';
	import { BsSpinner } from '@demotivator/ui';
	import ShareSheetDialog from './shareSheetDialog.svelte';
	import {
		createSharePayload,
		defaultShareButtons,
		getShareDestinationUrl,
		openShareEmail,
		openShareWindow
	} from '../utils/shareSheet';

	const LOADING_PLACEHOLDER = '...';

	const {
		user,
		avatarUrl,
		insultsSeenDB,
		insultStreakDB,
		achievementsDB,
		onRefreshInsultsSeen,
		onDeleteAccount
	} = $props();

	let achievementShareDialogOpen = $state(false);
	let achievementSharePreview = $state('');
	let achievementSharePayload = $state(null);
	let achievementShareCopyMessage = $state('');

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

	const copyToClipboard = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			achievementShareCopyMessage = 'Achievement share text copied.';
			setTimeout(() => {
				achievementShareCopyMessage = '';
			}, 2500);
		} catch (error) {
			console.error('Failed to copy achievement share text', error);
		}
	};

	const openAchievementShareDialog = (achievement) => {
		achievementSharePayload = createSharePayload({
			shareTitle: '(de)Motivator achievement',
			shareText: `${achievement.emoji} I just unlocked "${achievement.title}: ${achievement.description}" on (de)Motivator. 
			Check it out:
			`,
			fallbackUrl: '/'
		});
		achievementSharePreview = `${achievement.emoji} ${achievement.title}`;
		achievementShareDialogOpen = true;
	};

	const closeAchievementShareDialog = () => {
		achievementShareDialogOpen = false;
		achievementSharePreview = '';
		achievementSharePayload = null;
	};

	const shareAchievement = async (destination) => {
		if (!achievementSharePayload) {
			return;
		}
		try {
			if (destination === 'copy') {
				await copyToClipboard(achievementSharePayload.shareBody);
				closeAchievementShareDialog();
				return;
			}
			if (destination === 'x' || destination === 'facebook' || destination === 'reddit') {
				openShareWindow(getShareDestinationUrl(destination, achievementSharePayload));
				closeAchievementShareDialog();
				return;
			}
			if (destination === 'email') {
				openShareEmail(achievementSharePayload);
				closeAchievementShareDialog();
				return;
			}
			if (typeof navigator !== 'undefined' && navigator.share) {
				await navigator.share({
					title: achievementSharePayload.shareTitle,
					text: achievementSharePayload.shareText,
					url: achievementSharePayload.shareUrl
				});
				closeAchievementShareDialog();
				return;
			}
			await copyToClipboard(achievementSharePayload.shareBody);
			closeAchievementShareDialog();
		} catch (error) {
			console.error('Failed to share achievement', error);
		}
	};

</script>

<div class="card shadow-lg border-0 rounded-4 overflow-hidden border-l-4 border-primary-majorelle-blue dark:border-primary-majorelle-blue">
	<div class="card-body p-5 text-center">
		<div class="mb-4 position-relative d-inline-block">
			<img
				src={avatarUrl}
				alt="User Profile"
				class="rounded-circle shadow-sm border-3 border-white"
				style="width: 120px; height: 120px;"
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
	{#if achievementShareCopyMessage}
		<div class="alert alert-success py-2" role="alert">
			<Icon name="clipboard-check" /> {achievementShareCopyMessage}
		</div>
	{/if}
	{#if Array.isArray(achievementsDB)}
		<details class="mb-4 text-start p-3 rounded-3 border border-secondary-subtle bg-body" open>
			<summary class="h5 fw-bold mb-3 cursor-pointer">
				<Icon name="award-fill" /> Acheivements
			</summary>
				<div class="d-flex flex-column gap-2">
					{#each achievementsDB as achievement (achievement.id)}
						<div class={`p-3 rounded-3 border ${achievement.earned ? 'bg-body-tertiary border-primary-subtle' : 'bg-body-secondary border-secondary-subtle opacity-50'}`}>
							<div class="d-flex justify-content-between align-items-center mb-1 gap-2">
								<div class="fw-semibold">{achievement.emoji} {achievement.title}</div>
								{#if achievement.earned}
									<button
										type="button"
										class="btn btn-sm btn-outline-info"
										onclick={() => openAchievementShareDialog(achievement)}
									>
										<Icon name="share" /> Share
									</button>
								{:else}
									<span class="badge text-bg-secondary">Locked</span>
								{/if}
							</div>
							<p class="text-muted small mb-0">{achievement.description}</p>
						</div>
					{/each}
				</div>
			</details>
		{:else}
			<div class="pt-10">
				<BsSpinner type="primary" darkMode={darkMode} />
			</div>
		{/if}
		{#if achievementShareDialogOpen}
			<ShareSheetDialog
				dialogTitle="Share achievement"
				dialogDescription="Choose where to share this achievement:"
				previewText={achievementSharePreview}
				buttons={defaultShareButtons}
				onCloseDialog={closeAchievementShareDialog}
				onShare={shareAchievement}
			/>
		{/if}

		<button class="btn btn-primary btn-lg w-100 rounded-3 mb-3" onclick={launchConfetti}>
			<i class="bi bi-heart-fill me-2"></i> Launch Confetti
		</button>

		<hr class="my-4 text-secondary">

		<div class="d-flex justify-content-end align-items-center">
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
