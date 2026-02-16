<script>
  // Import generic stylesheets, essential libraries
  import '../../styles/css/app.css';
  import '../../styles/scss/bootstrap.scss';
  import hedgehog from '../../img/HedgehogIcon.png';

  // Import components
  import BsSpinner from '../../components/bs-spinner.svelte';
  import Auth from './auth.svelte';
  import BsAlert from '../../components/bs-Alert.svelte';
  import BsLoader from '../../components/bsLoader.svelte';
  import LoginForm from '../../components/loginForm.svelte';
  import UserProfileCard from '../../components/userProfileCard.svelte';
  import Footer from '../../components/footer.svelte';
  import Icon from '../../components/icon.svelte';

  // Import Misc Helpers
  import { bsTheme, darkMode } from '../../utils/darkMode';
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
  let keepMeLoggedIn = $state(false);

  const load = async () => {
  	const keepMeLoggedIn = window.localStorage.getItem('keepMeLoggedIn');
  	setTimeout(() => (ready = true), loadingDuration);
  };
  load();

  const refreshInsultsSeen = async () => {
  	const { readInsults } = await import('../../typescript/readInsults');
  	insultsSeenDB = await readInsults();
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

  		if (typeof hapticsImpactMedium !== 'undefined') await hapticsImpactMedium();
  		if (typeof hapticsVibrate !== 'undefined') await hapticsVibrate();

  		if (keepMeLoggedIn) {
  			window.localStorage.setItem('keepMeLoggedIn', 'true');
  		} else {
  			window.localStorage.setItem('keepMeLoggedIn', 'false');
  		}

  		// Load profile data after successful login
  		await refreshInsultsSeen();

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

<div id="root" data-bs-theme={bsTheme} class="min-h-screen w-full">
  <Auth
    useRedirect={false}
    let:user
    let:loggedIn
    let:loginWithGoogle
    let:signInAnonomous
    let:loginWithEmailPassword
    let:logout
  >
    {#if !ready}
      <div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
        <div class="mb-4">
           <BsSpinner type={loggedIn ? 'success' : 'primary'} />
        </div>
        <BsLoader type={loggedIn ? 'success' : 'primary'} loadingTime={loadingDuration} />
      </div>
    {/if}

    <div class="flex min-h-screen w-full overflow-hidden">
      <div class="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-5 lg:p-12 relative z-10">
        <div class="mb-5 text-center lg:text-start">
           <a href="/" class="text-decoration-none">
             <span class="display-6 fw-bold text-body">
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
            <UserProfileCard
              {user}
              {insultsSeenDB}
              onRefreshInsultsSeen={refreshInsultsSeen}
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
          </div>
          {/if}
        </div>

        <div class="hidden lg:block lg:w-1/2 relative dark:bg-black">
          <img
          class="absolute inset-0 w-full h-full object-cover opacity-90"
          src={hedgehog}
          alt="a hand drawn hedgehog"
          draggable="false"
          />
          <div class="absolute inset-0 "></div>
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
