<script>
// Import generic stylesheets, essential libraries
import hedgehog from '../../img/HedgehogIcon.png';

// Import components
import BsSpinner from '../../components/bs-spinner.svelte';
import Auth from './auth.svelte';
import BsAlert from '../../components/bs-Alert.svelte';
import BsLoader from '../../components/bsLoader.svelte';
import LoginForm from '../../components/loginForm.svelte';
import UserProfileCard from '../../components/userProfileCard.svelte';
import Footer from '../../components/footer.svelte';
import AuthBenefitsDialog from '../../components/authBenefitsDialog.svelte';

// Import Misc Helpers
import { bsTheme } from '../../utils/darkMode';
import { randomInRange } from '@porkyproductions/hat/randomInRange';
import { deviceType } from '../../utils/uaStub';
import { fade, fly } from 'svelte/transition';
import { name } from '../../typescript/constants';
import confetti from 'canvas-confetti';

// Firebase Logic
import { auth } from '../../utils/firebase';
import { deleteUser as firebaseDeleteUser } from 'firebase/auth';

// UI State
let emailBoxContent = $state('');
let pwText = $state('');
let emailInvalid = $state(false);
let pwInvalid = $state(false);
let dismissedBanner = $state(window.localStorage.getItem('dismissedBanner') === 'true');

// Loading Logic
let ready = $state(false);
const loadingDuration = randomInRange(800, 2000);

let error = $state(null);
let insultsSeenDB = $state('...');
let insultStreakDB = $state('...');
let keepMeLoggedIn = $state(false);

const load = async () => {
	window.localStorage.getItem('keepMeLoggedIn');
	await new Promise((resolve) => setTimeout(resolve, loadingDuration));
	ready = true;
};
load();

const refreshProfileStats = async () => {
	const [{ readInsults }, { readInsultStreak }] = await Promise.all([
		import('../../typescript/readInsults'),
		import('../../utils/insultStreak')
	]);
	const [insultsSeen, insultStreak] = await Promise.all([readInsults(), readInsultStreak()]);
	insultsSeenDB = insultsSeen;
	insultStreakDB = insultStreak;
};

const loginHandler = async (event, loginAction) => {
	event.preventDefault();

	if (deviceType === 'desktop') {
		ready = false;
	}

	try {
		error = null;

		await loginAction(emailBoxContent, pwText);

		confetti({
			angle: randomInRange(55, 125),
			spread: randomInRange(50, 70),
			particleCount: randomInRange(50, 100),
			origin: { y: 0.6 }
		});

		// eslint-disable-next-line no-undef
		if (typeof hapticsImpactMedium !== 'undefined') await hapticsImpactMedium();
		// eslint-disable-next-line no-undef
		if (typeof hapticsVibrate !== 'undefined') await hapticsVibrate();

		if (keepMeLoggedIn) {
			window.localStorage.setItem('keepMeLoggedIn', 'true');
		} else {
			window.localStorage.setItem('keepMeLoggedIn', 'false');
		}

		// Load profile data after successful login
		await refreshProfileStats();

		setTimeout(() => (ready = true), 1000);
	} catch (err) {
		error = err;
		ready = true;
	}
};

const deleteUserAccount = async () => {
	const user = auth.currentUser;
	try {
		await firebaseDeleteUser(user);
	} catch (err) {
		error = err;
	}
};
</script>

<div id="root" data-bs-theme="dark" class="login-root">
	<!-- Animated mesh gradient backdrop -->
	<div class="mesh-backdrop" aria-hidden="true">
		<div class="mesh-blob mesh-blob--a"></div>
		<div class="mesh-blob mesh-blob--b"></div>
		<div class="mesh-blob mesh-blob--c"></div>
	</div>

	<Auth
		useRedirect={false}
		let:user
		let:loggedIn
		let:loginWithGoogle
		let:loginWithEmailPassword
		let:logout
	>
		{#if !ready}
		<div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center login-loader-overlay">
			<div class="mb-4">
				<BsSpinner type={loggedIn ? 'success' : 'primary'} />
			</div>
			<BsLoader type={loggedIn ? 'success' : 'primary'} loadingTime={loadingDuration} />
		</div>
		{/if}

		<main class="login-stage">
			<div class="login-card">
				<!-- Brand panel -->
				<div class="login-brand">
					<a href="/" class="login-brand__wordmark">
						PorkyProductions<span class="login-brand__accent">ID</span>
					</a>
					<img src={hedgehog} alt="PorkyProductions hedgehog mascot" class="login-brand__hog" draggable="false" />
					<p class="login-brand__tagline">Your portal to the demotivation zone.</p>
				</div>

				<!-- Form panel -->
				<div class="login-form-panel">
					{#if error}
					<div transition:fly={{ y: -20 }} class="mb-4">
						<BsAlert
							icon="exclamation-diamond-fill"
							type="danger"
							text={error.message ?? 'An unknown error occurred.'}
						/>
					</div>
					{/if}

					{#if !dismissedBanner && !loggedIn}
					<div transition:fade class="mb-4">
						<BsAlert
							icon="info-circle"
							type="info"
							text={`By using ${name}, you consent to cookies.`}
							actionLink="https://policies.google.com/privacy"
							actionText="Details"
							onclick={() => { dismissedBanner = true; window.localStorage.setItem('dismissedBanner', 'true'); }}
						/>
					</div>
					{/if}

					{#if loggedIn}
					<div in:fade={{ duration: 300, delay: 150 }}>
						<UserProfileCard
							{user}
							{insultsSeenDB}
							{insultStreakDB}
							onRefreshInsultsSeen={refreshProfileStats}
							onLogout={logout}
							onDeleteAccount={deleteUserAccount}
						/>
					</div>
					{:else}
					<div in:fade={{ duration: 300, delay: 150 }}>
						<LoginForm
							bind:emailBoxContent
							bind:pwText
							bind:emailInvalid
							bind:pwInvalid
							bind:keepMeLoggedIn
							onSubmit={(e) => loginHandler(e, loginWithEmailPassword)}
							{loginWithGoogle}
						/>
						<div class="mt-4 text-center">
							<AuthBenefitsDialog
								modalId="loginBenefitsDialog"
								buttonClass="btn btn-outline-secondary btn-sm"
								buttonText="What do I get with PorkyProductionsID?"
							/>
						</div>
					</div>
					{/if}
				</div>
			</div>
		</main>
		<Footer />
	</Auth>
</div>

<style>
	:global(body), :global(html) {
		height: 100%;
		margin: 0;
	}

	.login-root {
		min-height: 100vh;
		position: relative;
		background: #06060f;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.mesh-backdrop {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	.mesh-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(90px);
		will-change: transform;
	}

	.mesh-blob--a {
		width: 60vw;
		height: 60vw;
		background: radial-gradient(circle at center, rgba(99, 102, 241, 0.45) 0%, transparent 70%);
		top: -20%;
		left: -15%;
		animation: driftA 22s ease-in-out infinite;
	}

	.mesh-blob--b {
		width: 50vw;
		height: 50vw;
		background: radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
		bottom: -15%;
		right: -10%;
		animation: driftB 26s ease-in-out infinite;
	}

	.mesh-blob--c {
		width: 45vw;
		height: 45vw;
		background: radial-gradient(circle at center, rgba(79, 70, 229, 0.3) 0%, transparent 70%);
		top: 30%;
		left: 25%;
		animation: driftC 30s ease-in-out infinite;
	}

	@keyframes driftA {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33% { transform: translate(8%, 14%) scale(1.08); }
		66% { transform: translate(-5%, 7%) scale(0.94); }
	}

	@keyframes driftB {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33% { transform: translate(-10%, -9%) scale(1.06); }
		66% { transform: translate(7%, -13%) scale(0.91); }
	}

	@keyframes driftC {
		0%, 100% { transform: translate(0, 0) scale(1); }
		50% { transform: translate(-18%, 11%) scale(1.12); }
	}

	.login-stage {
		position: relative;
		z-index: 1;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem 5rem;
	}

	.login-card {
		display: flex;
		width: 100%;
		max-width: 880px;
		min-height: 460px;
		border-radius: 20px;
		overflow: hidden;
		background: rgba(12, 12, 30, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.07);
		backdrop-filter: blur(28px);
		-webkit-backdrop-filter: blur(28px);
		box-shadow:
			0 0 0 1px rgba(99, 102, 241, 0.12),
			0 40px 80px rgba(0, 0, 0, 0.7),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.login-brand {
		flex: 0 0 38%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.25rem;
		padding: 3rem 2rem;
		background: rgba(99, 102, 241, 0.07);
		border-right: 1px solid rgba(255, 255, 255, 0.05);
		text-align: center;
	}

	.login-brand__wordmark {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.92);
		font-size: 1.45rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.15;
	}

	.login-brand__wordmark:hover {
		color: #fff;
	}

	.login-brand__accent {
		color: #818cf8;
	}

	.login-brand__hog {
		width: 130px;
		height: 130px;
		object-fit: contain;
		filter: drop-shadow(0 0 30px rgba(129, 140, 248, 0.55));
		animation: hogFloat 5s ease-in-out infinite;
	}

	@keyframes hogFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	.login-brand__tagline {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.82rem;
		margin: 0;
		max-width: 175px;
		line-height: 1.6;
	}

	.login-form-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 3rem 2.5rem;
		overflow-y: auto;
	}

	@media (max-width: 700px) {
		.login-card {
			flex-direction: column;
			max-width: 440px;
			min-height: unset;
		}

		.login-brand {
			flex: unset;
			padding: 2rem 1.5rem;
			border-right: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		}

		.login-brand__hog {
			width: 80px;
			height: 80px;
		}

		.login-form-panel {
			padding: 2rem 1.5rem;
		}
	}

	.login-loader-overlay {
		background: rgba(6, 6, 15, 0.7);
		backdrop-filter: blur(8px);
	}
</style>
