<script>
  // Import generic stylesheets, essential libraries
  import "../../styles/css/app.css";
  import "../../styles/css/customProps.css";
  import lbl from '../../img/login-background-light.svg'
  import lbd from '../../img/login-background-dark.svg'
  // Import components
  import BsSpinner from "../../components/bs-spinner.svelte";
  import LoginFooter from "../../components/loginFooter.svelte";
  import Title from "../../components/title.svelte";
  import person from "bootstrap-icons/icons/person-circle.svg";
  import Icon from "../../components/icon.svelte";
  import Auth from "./auth.svelte";
  import BsAlert from "../../components/bs-Alert.svelte";
  import BsModal from "../../components/bs-modal.svelte";
  import BsButton from "../../components/bsButton.svelte";
  import BsLoader from "../../components/bsLoader.svelte";
  // Import Misc Helpers
  import { onMount, beforeUpdate } from "svelte";
  import { bsTheme, darkMode } from "../../utils/darkMode";
  import { randomInRange } from "@porkyproductions/hat/randomInRange";
  import { deviceType } from "uadetect/dist/deviceType";
  import { fade } from "svelte/transition";
  import confetti from "canvas-confetti";
  import { name } from "../../typescript/constants";

  


  let emailBoxContent
  let emailBox
  let emailInvalid = true
  let pwText = ""
  let pwInvalid = true
  let dismissedBanner = window.localStorage.getItem("dismissedBanner")
  // Loading Logic
  let ready = false;
  let duration = randomInRange(1, 3500);
  const load = async () => {
    const keepMeLoggedIn = window.localStorage.getItem("keepMeLoggedIn")
    const { SplashScreen } = await import("@capacitor/splash-screen");
    await SplashScreen.show({
      showDuration: duration,
      autoHide: true,
    });
    setTimeout(() => (ready = true), duration);
    if (keepMeLoggedIn == "true") {
      await loginHandler();
    }
  };
  load();

  // FROM BEYOND THIS POINT IS FIREBASE LOGIC
  // BEWARE

  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { firebaseConfig } from "../../typescript/insults";

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  import {
    getAuth,
  } from "firebase/auth";
  const auth = getAuth();
  const user = auth.currentUser;

  let loginWithEmailPassword;
  let error = null;
  let insultsSeenDB;
  const refreshInsultsSeen = async () => {
    let { readInsults } = await import('../../typescript/readInsults')
    insultsSeenDB = await readInsults()
  }

  let keepMeLoggedIn = false;

  const onChangeLoginText = async () => {
    const { isEmailValid, isPwValid } = await import( "../../utils/regEx");
    if (isPwValid(pwText)) {
      pwInvalid = false
    } else pwInvalid = true
    if (isEmailValid(emailBoxContent)) {
      emailInvalid = false
    } else emailInvalid = true
  }

  
  const loginHandler = async (event) => {
    if (deviceType === "desktop") {
      ready = false;
    }
    const { randomInRange } = await import("@porkyproductions/hat/randomInRange");
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    const { email, password } = event.target.elements;
    const hapticsVibrate = async () => {
      await Haptics.vibrate();
    };
    const hapticsImpactMedium = async () => {
      await Haptics.impact({ style: ImpactStyle.Medium });
    };
    try {
      error = null;
      await loginWithEmailPassword(email.value, password.value);
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      });
      await hapticsImpactMedium();
      await hapticsVibrate();
      if (keepMeLoggedIn) {
        window.localStorage.setItem("keepMeLoggedIn", "true")
      } else {
        window.localStorage.setItem("keepMeLoggedIn", "false")
      }
      load();
    } catch (err) {
      error = err;
    }
  };

  const deleteUser = async () => {
    const { deleteUser } = await import("firebase/auth");
    const { Haptics } = await import("@capacitor/haptics");
    const { showConfirm } = await import("../../typescript/easterEggs");
    const user = auth.currentUser;
    try {
      await Haptics.vibrate();
      await showConfirm(
        "Are you sure?",
        "This is your last chance to back out."
      );
      deleteUser(user);
    } catch (err) {
      error = err;
    }
  };

  let verifyEmailButtonText = "Verify Email";

  const verifyEmail = async () => {
    const { sendEmailVerification } = await import("firebase/auth");
    sendEmailVerification(auth.currentUser);
    verifyEmailButtonText = "Email Sent!";
  };

  const launchConfetti = async () => {
    const { randomInRange } = await import("@porkyproductions/hat/randomInRange");
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    const hapticsVibrate = async () => {
      await Haptics.vibrate();
    };
    const hapticsImpactMedium = async () => {
      await Haptics.impact({ style: ImpactStyle.Medium });
    };
    let i = 3;
    while (i >= 0) {
      confetti({
        angle: randomInRange(50, 90),
        spread: randomInRange(25, 100),
        particleCount: randomInRange(1, 999),
        origin: { y: 0.6 },
      });
      await hapticsVibrate();
      await hapticsImpactMedium();
      i -= 1;
    }
  };
  onMount(() => refreshInsultsSeen())
  beforeUpdate(() => refreshInsultsSeen())
</script>


<div id="root" data-bs-theme={bsTheme}>
  <Auth
    useRedirect={false}
    let:user
    let:loggedIn
    let:loginWithGoogle
    let:signInAnonomous
    bind:loginWithEmailPassword
    let:logout
  >
  <div class="overflow-hidden">
    {#if !ready}
      {#if loggedIn}
        <div class="p-4">
          <BsSpinner type="success" />
        </div>
        <div class="m-auto px-8">
          <BsLoader type="success" loadingTime={duration} />
        </div>
      {:else}
        {#if error}
          <div class="p-4">
            <BsSpinner type="danger" />
          </div>
          <div class="m-auto px-8">
            <BsLoader type="danger" loadingTime={duration} />
          </div>
        {/if}
          <div class="p-4">
            <BsSpinner type="primary" />
          </div>
          <div class="m-auto px-8">
            <BsLoader type="primary" loadingTime={duration} />
          </div>
      {/if}
    {:else}
      <div id="wrapper" class="relative right-0 left-0 top-0 bottom-0">
          {#if error}
            <div transition:fade class="p-2 mb-6">
              <BsAlert
                icon="exclamation-diamond-fill"
                actionLink=" "
                actionText=" "
                type="danger"
                text={error.message ?? "An error occured. Try again"}
              />
            </div>
          {/if}
          {#if !dismissedBanner}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div aria-roledescription="banner" transition:fade class="p-2 mb-6" on:click={window.localStorage.setItem("dismissedBanner", "true")} on:keydown={() => void(0)}>
              <BsAlert
              icon="info-circle"
              iconAlt="info"
              type="info"
              text={`By using ${name} with an account, you consent to our, as well as Google's cookies`}
              actionLink="https://policies.google.com/privacy"
              actionText="Learn More"
              />
            </div>
          {/if}
          {#if error}
            <div transition:fade class="p-2 mb-6">
              <BsAlert
                icon="exclamation-diamond-fill"
                actionLink=" "
                actionText=" "
                type="danger"
                text={error.message ?? "An error occured. Try again"}
              />
            </div>
          {/if}
        <div class="">
          <div class="wrapper flex content-center justify-center">
            {#if loggedIn}
              <div class="w-full md:max-w-[30rem]" id="loggedInUI" transition:fade>
                <div class="text-center">
                  {#if user.picture}
                    <img
                      src={user.picture}
                      alt="the profile of the user"
                      width="40%"
                      class="m-auto rounded-3xl dark:text-black"
                      draggable="false"
                      id="pfp"
                    />
                  {:else}
                    <div class="text-[12rem] p-0">
                      <i class="bi bi-person-circle">
                    </div>
                  {/if}
                  <span class="font-semibold font-primary text-3xl">
                    Hello, <span class="font-bold">{user.name ?? "Guest"}</span>
                  </span>
                  <h2 class="font-primary pb-4 text-3xl">{user.email ?? ""}</h2>
                  <h2 class="font-primary pb-4 text-3xl">You've seen {insultsSeenDB ?? "no"} insults</h2>
                  <h2 class="font-primary">Your {name} UserID:</h2>
                  <h3 class="font-primary text-xl">
                    {user.id ?? " "}
                  </h3>
                  <button
                    type="button"
                    class="mt-3 btn btn-primary"
                    on:click={launchConfetti}
                  >
                    <i class="bi bi-heart"> &nbsp;Launch Confetti
                  </button>
                  <button
                    type="button"
                    class="mt-3 btn btn-warning"
                    on:click={logout}> <i class="bi bi-door-open"> &nbsp;Logout</button
                  >
                  <div class="mt-3 pb-3">
                    <BsModal
                      preButtonText="Delete Account"
                      preButtonType="danger"
                      preButtonIcon="person-x"
                      icon="exclamation-diamond-fill"
                      title="Are you sure?"
                      body="Once an account is deleted, it cannot be undone, and any data associated with that account will be forever lost. Be absolutely sure."
                      confirmButtonType="danger"
                      confirmButtonText="Delete Account"
                      confirmButtonAction={deleteUser}
                      closeButtonType="secondary"
                      closeButtonText="Back to safety"
                    />
                  </div>
                </div>
                <div class="text-center m-auto">
                  <div class="flex content-center justify-center p-4">
                    <BsButton href="/list.html" type="secondary" text="View All Insults" icon="binoculars" />
                    &nbsp;
                    {#if darkMode}
                      <button type="button" on:click={refreshInsultsSeen} on:keypress={refreshInsultsSeen}>
                          <BsButton href="" type="dark" text="Refresh Insults Seen" icon="arrow-clockwise" />
                      </button>
                    {:else}
                      <button type="button" on:click={refreshInsultsSeen} on:keypress={refreshInsultsSeen}>
                        <BsButton href="" type="light" text="Refresh Insults Seen" icon="arrow-clockwise" />
                      </button>
                    {/if}
                    
                  </div>
                </div>
              </div>
            {:else}
            <div class="w-full flex flex-wrap">

              <div class="w-full md:w-1/2 flex flex-col" transition:fade>
      
                  <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                      <a href="/" class="p-10 m-10 text-center"><Title /></a>
                  </div>
      
                  <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                      <form class="flex flex-col pt-3 md:pt-8" on:submit={loginHandler}>
                        <div class="mb-4">
                          <label class="form-label" for="email">Email</label>
                          <input
                            class={`input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text ${emailInvalid ? "is-invalid" : "is-valid"}`}
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            bind:value={emailBoxContent}
                            on:change={onChangeLoginText}
                            bind:this={emailBox}
                            required
                          />
                          <div class="invalid-feedback">Must be valid email!</div>
                        </div>
                        <div class="mb-6">
                          <label class="form-label" for="password">Password</label>
                          <input
                            class={`input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text ${pwInvalid ? "is-invalid" : "is-valid"}`}
                            id="password"
                            type="password"
                            placeholder="******************"
                            required
                            bind:value={pwText}
                            on:change={onChangeLoginText}
                          />
                          <div class="invalid-feedback">Password must meet the following requirements: Must be at least 8 characters long. Must contain at least 1 capital letter. Must contain at least 1 number. Must contain at least 1 symbol from the set '@$!%*#?&'</div>
                        </div>
          
                          <button type="submit" value="Log In" class="btn btn-primary p-2 mt-8">Sign in <Icon name="person-plus" /></button>
                          <button on:click={loginWithGoogle}  value="Log In With Google" class="btn btn-secondary p-2 mt-8">Sign in with&nbsp; <Icon name="google" /></button>
                      </form>
                      <div class="text-center pt-12 pb-12">
                          <div>Don't have an account? <a href="signUp.html" class="underline font-semibold">Sign up</a></div>
                      </div>
                  </div>
      
              </div>
      
              <!-- Image Section -->
              <div class="w-1/2">
                  <img class="object-cover w-full h-screen hidden md:block" src={darkMode ? lbd : lbl} alt="multicolored polka dots">
              </div>
          </div>
      
            {/if}
          </div>
        </div>
      </div>
    {/if}
    </div>
  </Auth>
</div>

<style>
  i {
    text-decoration: none;
    font-style: normal;
  }
  div#wrapper {
    background-size: cover;
    width: 100%;
    height: 100%;
    color: hsl(0, 0%, 0%);
    position: absolute;
    bottom: 0;
  }

  @media (prefers-color-scheme: dark) {
    div#wrapper {
    background-size: cover;
    width: 100%;
    height: 100%;
    color: hsl(0, 0%, 100%);
    position: absolute;
    bottom: 0;
  }

    form,
    div#loggedInUI {
      background-color: hsl(0, 0%, 4%);
    }
    #pfp {
      background-color: white;
    }
  }
</style>
