<script>
  // Import generic stylesheets, essential libraries
  import "../../styles/css/app.css";
  import "../../styles/css/customProps.css";
  import lbl from '../../img/login-background-light.svg'
  import lbd from '../../img/login-background-dark.svg'
  import hedehog from '../../img/HedgehogIcon.png'
  
  // Import components
  import BsSpinner from "../../components/bs-spinner.svelte";
  import Title from "../../components/title.svelte";
  import Icon from "../../components/icon.svelte";
  import Auth from "./auth.svelte";
  import BsAlert from "../../components/bs-Alert.svelte";
  import BsModal from "../../components/bs-modal.svelte";
  import BsButton from "../../components/bsButton.svelte";
  import BsLoader from "../../components/bsLoader.svelte";

  // Import Misc Helpers
  import { onMount } from "svelte";
  import { bsTheme, darkMode } from "../../utils/darkMode";
  import { randomInRange } from "@porkyproductions/hat/randomInRange";
  import { deviceType } from "../../utils/uaStub";
  import { fade, fly } from "svelte/transition";
  import confetti from "canvas-confetti";
  import { name } from "../../typescript/constants";

  // Firebase Logic
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { firebaseConfig } from "../../typescript/insults";
  import { getAuth, deleteUser as firebaseDeleteUser } from "firebase/auth";

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  // UI State
  let emailBoxContent = $state("");
  let pwText = $state("");
  let emailInvalid = $state(false);
  let pwInvalid = $state(false);
  let dismissedBanner = $state(window.localStorage.getItem("dismissedBanner") === "true");

  // Loading Logic
  let ready = $state(false);
  let loadingDuration = randomInRange(800, 2000);

  // NOTE: We removed the top-level 'let loginWithEmailPassword;' 
  // because we will pass it into the handler from the HTML.

  let error = $state(null);
  let insultsSeenDB = $state("...");
  let keepMeLoggedIn = $state(false);

  const load = async () => {
    const keepMeLoggedIn = window.localStorage.getItem("keepMeLoggedIn");
    setTimeout(() => (ready = true), loadingDuration);
    // Note: Auto-login logic handles itself via auth state listener usually, 
    // but if you need to force it, you'd need access to the auth instance here.
  };
  load();

  const refreshInsultsSeen = async () => {
    let { readInsults } = await import('../../typescript/readInsults')
    insultsSeenDB = await readInsults()
  }

  const onChangeLoginText = async () => {
    const { isEmailValid, isPwValid } = await import( "../../utils/regEx");
    pwInvalid = !isPwValid(pwText);
    emailInvalid = !isEmailValid(emailBoxContent);
  }
  
  // Helper function to determine form validation classes
  const getValidationClass = (value, isInvalid) => {
    if (!value) return ""; // No validation class if empty
    return isInvalid ? "is-invalid" : "is-valid";
  };

  // 1. UPDATE: Handler now accepts 'loginAction' as the second argument
  const loginHandler = async (event, loginAction) => {
    event.preventDefault(); 
    
    if (deviceType === "desktop") {
      ready = false;
    }
    const { randomInRange } = await import("@porkyproductions/hat/randomInRange");
    
    try {
      error = null;
      
      // Use the function passed from the component
      await loginAction(emailBoxContent, pwText);
      
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      });
      
      if (typeof hapticsImpactMedium !== 'undefined') await hapticsImpactMedium();
      if (typeof hapticsVibrate !== 'undefined') await hapticsVibrate();

      if (keepMeLoggedIn) {
        window.localStorage.setItem("keepMeLoggedIn", "true")
      } else {
        window.localStorage.setItem("keepMeLoggedIn", "false")
      }
      
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

  const launchConfetti = async () => {
    const { randomInRange } = await import("@porkyproductions/hat/randomInRange");
    let i = 3;
    const interval = setInterval(() => {
        if (i <= 0) clearInterval(interval);
        confetti({
            angle: randomInRange(50, 90),
            spread: randomInRange(25, 100),
            particleCount: randomInRange(20, 50),
            origin: { y: 0.6 },
        });
        i--;
    }, 200);
  };

  $effect(() => {
    refreshInsultsSeen();
  });
</script>


<div id="root" data-bs-theme={bsTheme} class="min-h-screen w-full bg-body">
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
      <div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-body backdrop-blur-sm">
        <div class="mb-4">
           <BsSpinner type={loggedIn ? "success" : "primary"} />
        </div>
        <BsLoader type={loggedIn ? "success" : "primary"} loadingTime={loadingDuration} />
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
              text={error.message ?? "An unknown error occurred."}
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
              onclick={() => { dismissedBanner = true; window.localStorage.setItem("dismissedBanner", "true"); }}
            />
          </div>
        {/if}

        {#if loggedIn}
          <div in:fade={{ duration: 300, delay: 150 }} class="card shadow-lg border-0 rounded-4 overflow-hidden">
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
                Hello, <span class="text-primary-majorelle-blue dark:text-secondary-orange-pantone">{user.name ?? "Guest"}</span>
              </h2>
              <p class="card-text text-muted font-monospace mb-4">{user.email}</p>
              
              <div class="row g-3 mb-4">
                <div class="col-6">
                    <div class="p-3 bg-body-tertiary rounded-3">
                        <small class="text-uppercase text-secondary fw-bold d-block">Insults Seen</small>
                        <span class="fs-4 fw-bold">{insultsSeenDB ?? 0}</span>
                    </div>
                </div>
                <div class="col-6">
                    <div class="p-3 bg-body-tertiary rounded-3">
                        <small class="text-uppercase text-secondary fw-bold d-block">User ID</small>
                        <span class="font-monospace text-truncate d-block" title={user.id}>{user.id}</span>
                    </div>
                </div>
              </div>

              <button class="btn btn-primary btn-lg w-100 rounded-3 mb-3" onclick={launchConfetti}>
                 <i class="bi bi-heart-fill me-2"></i> Launch Confetti
              </button>
               
               <div class="d-flex gap-2 justify-content-center mb-4">
                  <BsButton href="/list.html" type="secondary" text="All Insults" icon="binoculars" />
                  <div onclick={refreshInsultsSeen} onkeypress={refreshInsultsSeen} role="button" tabindex="0">
                    <BsButton href="#" type={darkMode ? "dark" : "light"} text="Refresh Stats" icon="arrow-clockwise" />
                  </div>
               </div>

               <hr class="my-4 text-secondary">

               <div class="d-flex justify-content-between align-items-center">
                 <button onclick={logout} class="btn btn-link text-decoration-none text-secondary fw-semibold p-0">
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
                    confirmButtonAction={deleteUserAccount}
                    closeButtonType="secondary"
                    closeButtonText="Back to safety"
                  />
               </div>
            </div>
          </div>
        {:else}
          <div in:fade={{ duration: 300, delay: 150 }} class="mx-auto w-100" style="max-width: 480px;">
            <div class="mb-5">
              <h1 class="fw-bold mb-2">Welcome back</h1>
              <p class="text-secondary lead">Enter your details to access your account.</p>
            </div>

            <form onsubmit={(e) => loginHandler(e, loginWithEmailPassword)} class="d-flex flex-column gap-3">
              <div>
                <label class="form-label fw-semibold" for="email">Email Address</label>
                <div class="input-group has-validation">
                    <input
                        class={`form-control form-control-lg ${getValidationClass(emailBoxContent, emailInvalid)}`}
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        bind:value={emailBoxContent}
                        onchange={onChangeLoginText}
                        oninput={onChangeLoginText}
                        required
                    />
                    {#if emailInvalid && emailBoxContent}
                      <div class="invalid-feedback d-block">
                        Please enter a valid email address.
                      </div>
                    {/if}
                    {#if !emailInvalid && emailBoxContent}
                    {/if}
                </div>
              </div>

              <div>
                <label class="form-label fw-semibold" for="password">Password</label>
                <div class="input-group has-validation">
                    <input
                        class={`form-control form-control-lg ${getValidationClass(pwText, pwInvalid)}`}
                        id="password"
                        type="password"
                        placeholder="••••••••••••"
                        required
                        bind:value={pwText}
                        onchange={onChangeLoginText}
                        oninput={onChangeLoginText}
                    />
                    {#if pwInvalid && pwText.length > 0}
                      <div class="invalid-feedback d-block">
                        Password requirements not met.
                      </div>
                    {/if}
                </div>
              </div>

              <div class="form-check my-2">
                  <input class="form-check-input" type="checkbox" id="keepLoggedIn" bind:checked={keepMeLoggedIn}>
                  <label class="form-check-label text-secondary" for="keepLoggedIn">Keep me logged in</label>
              </div>

              <div class="d-grid gap-3 mt-3">
                <button type="submit" class="btn btn-primary btn-lg shadow-sm">
                   Sign In <Icon name="person-plus" />
                </button>
                <button type="button" onclick={loginWithGoogle} class="btn btn-outline-secondary btn-lg bg-body text-body">
                  <Icon name="google" /> &nbsp; Sign in with Google
                </button>
              </div>
            </form>

            <div class="mt-5 text-center">
              <p class="text-secondary">
                Don't have an account? <a href="signUp.html" class="fw-bold text-primary text-decoration-none">Create one</a>
              </p>
            </div>
          </div>
        {/if}
      </div>

      <div class="hidden lg:block lg:w-1/2 relative bg-black">
        <img 
          class="absolute inset-0 w-full h-full object-cover opacity-90" 
          src={darkMode ? lbd : lbl} 
          alt="Decorative Background"
          draggable="false"
        />
        <div class="absolute inset-0 bg-linear-to-l from-black/10 to-transparent"></div>
      </div>
    </div>
  </Auth>
</div>

<style>
  :global(body), :global(html) {
    height: 100%;
    margin: 0;
  }
</style>