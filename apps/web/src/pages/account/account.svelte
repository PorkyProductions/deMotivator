<script lang="ts">
	import hedgehog from '../../img/HedgehogIcon.png';
	import { onMount } from 'svelte';
	import Auth from '../login/auth.svelte';
	import AuthBenefitsDialog from '../../components/authBenefitsDialog.svelte';
	import Footer from '../../components/footer.svelte';
	import { Icon } from '@demotivator/ui-components';
	import Title from '../../components/title.svelte';
	import UserProfileCard from '../../components/userProfileCard.svelte';
	import { bsTheme } from '../../utils/darkMode';
	import { getAvatarApiUrl } from '../../utils/avatarApi';
	import { auth } from '../../utils/firebase';
	import { deleteUser as firebaseDeleteUser } from 'firebase/auth';

	let errorMessage: string | null = $state(null);
	let insultsSeenDB = $state('...');
	let insultStreakDB = $state('...');
	let achievementsDB = $state('...');

	const refreshProfileStats = async () => {
		try {
			const [
				{ readInsults, getListOfAllUsersWhoHaveSeenInsults, leaderboard },
				{ readInsultStreak },
				{ syncMilestoneAchievements, syncLeaderboardRankAchievements, readAchievementCards }
			] = await Promise.all([
				import('../../typescript/readInsults'),
				import('../../utils/insultStreak'),
				import('../../utils/achievements')
			]);
			const [insultsSeen, insultStreak] = await Promise.all([readInsults(), readInsultStreak()]);
			await getListOfAllUsersWhoHaveSeenInsults();
			const currentUserRankIndex = leaderboard.findIndex((entry) => entry.isCurrentUser);
			const currentUserRank = currentUserRankIndex >= 0 ? currentUserRankIndex + 1 : null;
			await syncMilestoneAchievements(insultsSeen);
			await syncLeaderboardRankAchievements(currentUserRank);
			const achievementCards = await readAchievementCards();
			insultsSeenDB = insultsSeen;
			insultStreakDB = insultStreak;
			achievementsDB = achievementCards;
			errorMessage = null;
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Failed to refresh profile data.';
		}
	};

	const deleteUserAccount = async () => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			errorMessage = 'Unable to delete account right now. Please sign in again and retry.';
			return;
		}
		try {
			await firebaseDeleteUser(currentUser);
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Failed to delete account.';
		}
	};

	onMount(() => {
		return auth.onAuthStateChanged((currentUser) => {
			if (!currentUser) {
				window.location.replace('/login.html');
			}
		});
	});
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen bg-body">
	<Auth let:user let:loggedIn let:logout>
		<div class="auth-page-shell">
			<div class="mesh-gradient" aria-hidden="true"></div>
			<div class="auth-page-content">
				<div class="auth-panel card border-0 shadow-lg">
					<div class="card-body p-4 p-lg-5">
						<div class="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-4 mb-4 mb-lg-5">
							<div>
								<a href="/" class="text-decoration-none d-inline-flex align-items-center gap-3 mb-3">
									<img src={hedgehog} alt="a hand drawn hedgehog" class="auth-hog-badge" draggable="false" />
									<span class="display-6 fw-bold text-body mb-0">
										<Title />
									</span>
								</a>
								<h1 class="display-6 fw-bold mb-2">
									<Icon name="person-badge-fill" /> Account
								</h1>
								<p class="text-muted mb-0">
									Manage your profile, track your stats, and keep your account secure.
								</p>
							</div>
						</div>

						{#if errorMessage}
							<div class="alert alert-danger mb-4" role="alert">
								<Icon name="exclamation-diamond-fill" /> {errorMessage}
							</div>
						{/if}

						{#if loggedIn}
							<div class="row g-4 align-items-stretch">
								<div class="col-12 col-xxl-8">
									<UserProfileCard
										{user}
										avatarUrl={getAvatarApiUrl({
											userId: user?.id,
											displayName: user?.name,
											photoUrl: user?.picture
										})}
										{insultsSeenDB}
										{insultStreakDB}
										{achievementsDB}
										onRefreshInsultsSeen={refreshProfileStats}
										onDeleteAccount={deleteUserAccount}
									/>
								</div>
								<div class="col-12 col-xxl-4">
									<div class="card h-100 border-0 shadow-sm rounded-4">
										<div class="card-body p-4 d-flex flex-column">
											<h2 class="h4 fw-bold mb-3">
												<Icon name="stars" /> Account Hub
											</h2>
											<p class="text-muted mb-4">
												Quick links and actions for your account experience.
											</p>
											<div class="d-grid gap-2">
												<a href="/settings.html" class="btn btn-primary">
													<Icon name="sliders2" /> Open Settings
												</a>
												<a href="/leaderboard.html" class="btn btn-outline-primary">
													<Icon name="trophy-fill" /> Leaderboard
												</a>
												<a href="/list.html" class="btn btn-outline-secondary">
													<Icon name="collection-fill" /> Browse Insults
												</a>
												<button onclick={refreshProfileStats} class="btn btn-light w-100 mb-2">
													<Icon name="arrow-clockwise" /> Refresh Profile Data
												</button>
												<button onclick={logout} class="btn btn-outline-dark w-100">
													<Icon name="box-arrow-left" /> Sign Out
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						{:else}
							<div class="row justify-content-center">
								<div class="col-12 col-xl-10">
									<div class="card border-0 shadow-sm rounded-4">
										<div class="card-body text-center py-5 px-4 px-lg-5">
											<div class="text-danger mb-4 text-4xl">
												<Icon name="lock-fill" />
											</div>
											<h2 class="card-title fw-bold mb-3">Authentication Required</h2>
											<p class="card-text text-muted mb-4">
												Sign in to access your full account profile, stats, and synced progress.
											</p>
											<div class="d-flex flex-wrap gap-3 justify-content-center">
												<a href="/login.html" class="btn btn-primary btn-lg shadow-sm">
													<Icon name="box-arrow-in-right" /> Sign In
												</a>
												<a href="/signUp.html" class="btn btn-outline-primary btn-lg">
													<Icon name="person-plus" /> Create Account
												</a>
											</div>
											<div class="mt-4 d-flex justify-content-center">
												<AuthBenefitsDialog
													modalId="accountBenefitsDialog"
													buttonClass="btn btn-outline-info"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</Auth>
</div>
