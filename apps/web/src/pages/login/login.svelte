<script>
// Import generic stylesheets, essential libraries
import hedgehog from '../../img/HedgehogIcon.png';

// Import components
import Auth from './auth.svelte';
import { BsAlert } from '@demotivator/ui-components';
import LoginForm from '../../components/loginForm.svelte';
import Footer from '../../components/footer.svelte';
import AuthBenefitsDialog from '../../components/authBenefitsDialog.svelte';
import Spinhog from '../../components/spinhog.svelte';

// Import Misc Helpers
import { bsTheme } from '../../utils/darkMode';
import { randomInRange } from '@porkyproductions/hat/randomInRange';
import { deviceType } from '../../utils/uaStub';
import { fade, fly } from 'svelte/transition';
import { name } from '../../typescript/constants';
import confetti from 'canvas-confetti';

// Firebase Logic
import { onAuthStateChanged } from '../../utils/firebase';

// UI State
let emailBoxContent = $state('');
let pwText = $state('');
let emailInvalid = $state(false);
let pwInvalid = $state(false);
let dismissedBanner = $state(window.localStorage.getItem('dismissedBanner') === 'true');

// Loading Logic
let ready = $state(false);

let error = $state(null);
let keepMeLoggedIn = $state(false);

const load = async () => {
	window.localStorage.getItem('keepMeLoggedIn');
	ready = true;
};
load();

const routeToAccount = () => {
	window.location.href = '/account.html';
};

onAuthStateChanged((user) => {
	if (user) {
		routeToAccount();
	}
});

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
		if (keepMeLoggedIn) {
			window.localStorage.setItem('keepMeLoggedIn', 'true');
		} else {
			window.localStorage.setItem('keepMeLoggedIn', 'false');
		}

		setTimeout(() => {
			ready = true;
			routeToAccount();
		}, 1000);
	} catch (err) {
		error = err;
		ready = true;
	}
};
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen w-full">
<Auth
	useRedirect={false}
	let:loggedIn
	let:loginWithGoogle
	let:loginWithEmailPassword
>
	{#if !ready}
	<div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
		<Spinhog />
	</div>
	{/if}

	<div class="auth-page-shell">
		<div class="mesh-gradient" aria-hidden="true"></div>
		<div class="auth-page-content">
			<div class="auth-panel card border-0 shadow-lg">
				<div class="row g-0 h-100">
					<div class="col-12 col-lg-7 p-4 p-sm-5 p-xl-5 position-relative z-1">
						<div class="mb-5 text-center text-lg-start">
							<a href="/" class="text-decoration-none d-inline-flex align-items-center gap-3">
								<img src={hedgehog} alt="a hand drawn hedgehog" class="auth-hog-badge" draggable="false" />
								<span class="display-6 fw-bold text-body mb-0">
									PorkyProductions<span class="text-secondary">ID</span>
								</span>
							</a>
						</div>

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
								<p class="text-body-secondary mb-0 text-center">
									Redirecting to your account...
								</p>
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
										buttonClass="btn btn-outline-info"
										buttonText="What do I get with PorkyProductionsID?"
									/>
								</div>
							</div>
						{/if}
					</div>

					<div class="col-lg-5 d-none d-lg-flex align-items-center justify-content-center position-relative auth-aside">
						<img
							class="auth-hedgehog"
							src={hedgehog}
							alt="a hand drawn hedgehog"
							draggable="false"
						/>
						<div class="auth-aside-glow"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
	</Auth>
</div>

<style>
:global(body), :global(html) {
	height: 100%;
	margin: 0;
}
</style>
