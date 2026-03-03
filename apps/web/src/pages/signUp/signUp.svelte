<script>
// Import generic stylesheets, essential libraries
import hedgehog from '../../img/HedgehogIcon.png';

// Import components
import BsSpinner from '../../components/bs-spinner.svelte';
import Icon from '../../components/icon.svelte';
import Auth from '../login/auth.svelte';
import BsAlert from '../../components/bs-Alert.svelte';
import BsLoader from '../../components/bsLoader.svelte';
import Footer from '../../components/footer.svelte';
import AuthBenefitsDialog from '../../components/authBenefitsDialog.svelte';

// Import Misc Helpers
import { bsTheme } from '../../utils/darkMode';
import { randomInRange } from '@porkyproductions/hat/randomInRange';
import { randomInArray } from '@porkyproductions/hat/randomInArray';
import { deviceType } from '../../utils/uaStub';
import { fade, fly } from 'svelte/transition';
import confetti from 'canvas-confetti';
import { name } from '../../typescript/constants';

// Firebase Logic
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../typescript/insults';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sample names for placeholder
const names = [
	'Yamilet Martin', 'Patrick Tormey', 'Ronald Martin', 'Mohammad Kadel',
	'Jes Tabbert', 'Stephen White', 'Reuben White', 'Cecelia Rainey',
	'Anthony Irwin', 'Andrew Lopez', 'Brian Ohrt', 'Etha Jackowski'
];
const randomName = randomInArray(names);

// UI State
let emailBoxContent = $state('');
let pwText = $state('');
let confirmPwText = $state('');
let displayNameText = $state('');
let photoURLText = $state('');
let emailInvalid = $state(false);
let pwInvalid = $state(false);
let confirmPwInvalid = $state(false);
let agreedToTerms = $state(false);
let dismissedBanner = $state(window.localStorage.getItem('dismissedBanner') === 'true');
let signupSuccess = $state(false);

// Loading Logic
let ready = $state(false);
const loadingDuration = randomInRange(800, 2000);

let error = $state(null);

const load = async () => {
	await new Promise((resolve) => setTimeout(resolve, loadingDuration));
	ready = true;
};
load();

const onChangeSignupText = async () => {
	const { isEmailValid, isPwValid } = await import('../../utils/regEx');
	pwInvalid = !isPwValid(pwText);
	emailInvalid = !isEmailValid(emailBoxContent);
	confirmPwInvalid = pwText !== confirmPwText || !confirmPwText;
};

// Helper function to determine form validation classes
const getValidationClass = (value, isInvalid) => {
	if (!value) return ''; // No validation class if empty
	return isInvalid ? 'is-invalid' : 'is-valid';
};

const signUpHandler = async (event) => {
	event.preventDefault();

	if (deviceType === 'desktop') {
		ready = false;
	}

	try {
		error = null;

		// Validate agreement to terms
		if (!agreedToTerms) {
			throw new Error('You must agree to the terms and conditions before signing up!');
		}

		// Validate password match
		if (pwText !== confirmPwText) {
			throw new Error('Passwords do not match!');
		}

		// Validate email and password format
		const { emailRegExp, pwRegExp } = await import('../../utils/regEx');
		if (!emailRegExp.test(emailBoxContent)) {
			throw new Error('Must be a valid email address');
		}
		if (!pwRegExp.test(pwText)) {
			throw new Error('Password must meet security requirements');
		}

		// Create user account
		const userCredential = await createUserWithEmailAndPassword(auth, emailBoxContent, pwText);
		const user = userCredential.user;

		// Send verification email
		await sendEmailVerification(user);

		// Update profile with display name and photo
		await updateProfile(user, {
			displayName: displayNameText || randomName,
			photoURL: photoURLText || null
		});

		// Success celebration
		const { randomInRange } = await import('@porkyproductions/hat/randomInRange');
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

		signupSuccess = true;
		setTimeout(() => (ready = true), 1000);

	} catch (err) {
		error = err;
		ready = true;
	}
};
</script>

<div id="root" data-bs-theme="dark" class="signup-root">
	<!-- Animated mesh gradient backdrop -->
	<div class="mesh-backdrop" aria-hidden="true">
		<div class="mesh-blob mesh-blob--a"></div>
		<div class="mesh-blob mesh-blob--b"></div>
		<div class="mesh-blob mesh-blob--c"></div>
	</div>

	<Auth useRedirect={signupSuccess} let:loggedIn>
		{#if !ready}
		<div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center signup-loader-overlay">
			<div class="mb-4">
				<BsSpinner type={signupSuccess ? 'success' : error ? 'danger' : 'primary'} />
			</div>
			<BsLoader type={signupSuccess ? 'success' : error ? 'danger' : 'primary'} loadingTime={loadingDuration} />
		</div>
		{/if}

		<main class="signup-stage">
			<div class="signup-card">
				<!-- Brand panel -->
				<div class="signup-brand">
					<a href="/" class="signup-brand__wordmark">
						PorkyProductions<span class="signup-brand__accent">ID</span>
					</a>
					<img src={hedgehog} alt="PorkyProductions hedgehog mascot" class="signup-brand__hog" draggable="false" />
					<p class="signup-brand__tagline">Join the demotivation zone. It's free.</p>
				</div>

				<!-- Form panel -->
				<div class="signup-form-panel">
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
							text={`By using ${name} with an account, you consent to our and Google's cookies.`}
							actionLink="https://policies.google.com/privacy"
							actionText="Learn More"
							onclick={() => { dismissedBanner = true; window.localStorage.setItem('dismissedBanner', 'true'); }}
						/>
					</div>
					{/if}

					{#if signupSuccess}
					<div transition:fly={{ y: -20 }} class="mb-4">
						<BsAlert
							icon="check-circle-fill"
							type="success"
							text="Account successfully created! Please check your email for verification."
							actionLink="/login.html"
							actionText="Sign In"
						/>
					</div>
					{/if}

					{#if loggedIn}
					<div in:fade={{ duration: 300, delay: 150 }} class="card shadow-lg border-0 rounded-4 overflow-hidden">
						<div class="card-body p-5 text-center">
							<h2 class="card-title fw-bold mb-3">You're Already Logged In!</h2>
							<p class="text-secondary mb-4">You already have an active session.</p>
							<a href="/login.html" class="btn btn-primary btn-lg w-100 rounded-3">
								<i class="bi bi-person-circle me-2"></i> View Your Account
							</a>
						</div>
					</div>
					{:else}
					<div in:fade={{ duration: 300, delay: 150 }}>
						<div class="mb-4">
							<h1 class="fw-bold mb-1 signup-form-heading">Create your account</h1>
							<p class="mb-0 signup-form-subheading">Fill in your details to get started.</p>
						</div>

						<form onsubmit={signUpHandler} class="d-flex flex-column gap-3">
							<div class="row g-3">
								<div class="col-12 col-sm-6">
									<label class="form-label fw-semibold" for="email">Email Address</label>
									<input
										class={`form-control form-control-lg ${getValidationClass(emailBoxContent, emailInvalid)}`}
										id="email"
										type="email"
										placeholder="you@example.com"
										bind:value={emailBoxContent}
										onchange={onChangeSignupText}
										oninput={onChangeSignupText}
										required
									/>
									{#if emailInvalid && emailBoxContent}
										<div class="invalid-feedback">
											Please enter a valid email address.
										</div>
									{/if}
								</div>

								<div class="col-12 col-sm-6">
									<label class="form-label fw-semibold" for="displayName">Display Name</label>
									<input
										class="form-control form-control-lg"
										id="displayName"
										type="text"
										placeholder={randomName}
										bind:value={displayNameText}
									/>
								</div>

								<div class="col-12 col-sm-6">
									<label class="form-label fw-semibold" for="password">Password</label>
									<input
										class={`form-control form-control-lg ${getValidationClass(pwText, pwInvalid)}`}
										id="password"
										type="password"
										placeholder="••••••••••••"
										bind:value={pwText}
										onchange={onChangeSignupText}
										oninput={onChangeSignupText}
										required
									/>
									{#if pwInvalid && pwText}
										<div class="invalid-feedback">
											Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character (@$!%*#?&).
										</div>
									{/if}
									{#if !pwInvalid && pwText}
										<div class="valid-feedback">
											Strong password (not stronger than your ego)
										</div>
									{/if}
								</div>

								<div class="col-12 col-sm-6">
									<label class="form-label fw-semibold" for="confirmPassword">Confirm Password</label>
									<input
										class={`form-control form-control-lg ${getValidationClass(confirmPwText, confirmPwInvalid)}`}
										id="confirmPassword"
										type="password"
										placeholder="••••••••••••"
										bind:value={confirmPwText}
										onchange={onChangeSignupText}
										oninput={onChangeSignupText}
										required
									/>
									{#if confirmPwInvalid && confirmPwText}
										<div class="invalid-feedback">
											Passwords do not match.
										</div>
									{/if}
								</div>

								<div class="col-12">
									<label class="form-label fw-semibold" for="photoURL">Profile Photo URL <span class="fw-normal signup-optional-label">(optional)</span></label>
									<input
										class="form-control form-control-lg"
										id="photoURL"
										type="url"
										placeholder="https://example.com/photo.jpg"
										bind:value={photoURLText}
									/>
								</div>
							</div>

							<div class="form-check my-2">
								<input
									class="form-check-input"
									type="checkbox"
									id="agreeTerms"
									bind:checked={agreedToTerms}
									required
								>
								<label class="form-check-label text-secondary" for="agreeTerms">
									I agree to the <a href="#" class="text-primary">Terms and Conditions</a> and
									<a href="https://policies.google.com/privacy" class="text-primary">Privacy Policy</a>
								</label>
							</div>

							<div class="d-grid gap-3">
								<button
									type="submit"
									class="btn btn-primary btn-lg shadow-sm"
									disabled={!agreedToTerms}
								>
									Create Account <Icon name="person-plus" />
								</button>
							</div>
						</form>

						<div class="mt-4 text-center">
							<p class="text-secondary mb-2">
								Already have an account? <a href="/login.html" class="fw-bold text-primary text-decoration-none">Sign in</a>
							</p>
							<AuthBenefitsDialog
								modalId="signUpBenefitsDialog"
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

	.signup-root {
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
		background: radial-gradient(circle at center, rgba(139, 92, 246, 0.45) 0%, transparent 70%);
		top: -20%;
		right: -15%;
		animation: driftA 24s ease-in-out infinite;
	}

	.mesh-blob--b {
		width: 50vw;
		height: 50vw;
		background: radial-gradient(circle at center, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
		bottom: -15%;
		left: -10%;
		animation: driftB 28s ease-in-out infinite;
	}

	.mesh-blob--c {
		width: 45vw;
		height: 45vw;
		background: radial-gradient(circle at center, rgba(79, 70, 229, 0.3) 0%, transparent 70%);
		top: 35%;
		left: 30%;
		animation: driftC 32s ease-in-out infinite;
	}

	@keyframes driftA {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33% { transform: translate(-8%, 12%) scale(1.08); }
		66% { transform: translate(5%, 7%) scale(0.94); }
	}

	@keyframes driftB {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33% { transform: translate(10%, -9%) scale(1.06); }
		66% { transform: translate(-7%, -13%) scale(0.91); }
	}

	@keyframes driftC {
		0%, 100% { transform: translate(0, 0) scale(1); }
		50% { transform: translate(16%, 11%) scale(1.12); }
	}

	.signup-stage {
		position: relative;
		z-index: 1;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem 5rem;
	}

	.signup-card {
		display: flex;
		width: 100%;
		max-width: 960px;
		border-radius: 20px;
		overflow: hidden;
		background: rgba(12, 12, 30, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.07);
		backdrop-filter: blur(28px);
		-webkit-backdrop-filter: blur(28px);
		box-shadow:
			0 0 0 1px rgba(139, 92, 246, 0.12),
			0 40px 80px rgba(0, 0, 0, 0.7),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.signup-brand {
		flex: 0 0 32%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.25rem;
		padding: 3rem 2rem;
		background: rgba(139, 92, 246, 0.07);
		border-right: 1px solid rgba(255, 255, 255, 0.05);
		text-align: center;
	}

	.signup-brand__wordmark {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.92);
		font-size: 1.4rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.15;
	}

	.signup-brand__wordmark:hover {
		color: #fff;
	}

	.signup-brand__accent {
		color: #a78bfa;
	}

	.signup-brand__hog {
		width: 120px;
		height: 120px;
		object-fit: contain;
		filter: drop-shadow(0 0 30px rgba(167, 139, 250, 0.55));
		animation: hogFloat 5s ease-in-out infinite;
	}

	@keyframes hogFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	.signup-brand__tagline {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.82rem;
		margin: 0;
		max-width: 175px;
		line-height: 1.6;
	}

	.signup-form-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2.5rem 2.5rem;
		overflow-y: auto;
	}

	@media (max-width: 750px) {
		.signup-card {
			flex-direction: column;
			max-width: 480px;
		}

		.signup-brand {
			flex: unset;
			padding: 2rem 1.5rem;
			border-right: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		}

		.signup-brand__hog {
			width: 80px;
			height: 80px;
		}

		.signup-form-panel {
			padding: 2rem 1.5rem;
		}
	}

	.signup-form-heading {
		color: rgba(255, 255, 255, 0.92);
		letter-spacing: -0.03em;
	}

	.signup-form-subheading {
		color: rgba(255, 255, 255, 0.45);
		font-size: 0.88rem;
	}

	.signup-optional-label {
		color: rgba(255, 255, 255, 0.35);
		font-size: 0.8em;
	}

	.signup-loader-overlay {
		background: rgba(6, 6, 15, 0.7);
		backdrop-filter: blur(8px);
	}
</style>
