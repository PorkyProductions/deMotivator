<script>
  // Import generic stylesheets, essential libraries
  import "../../styles/css/app.css";
  import "../../styles/css/customProps.css";
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
  import { randomInRange } from "@porkyproductions/hat/dist/randomInRange";
  import { deviceType } from "uadetect/dist/deviceType";
  import { fade } from "svelte/transition";



  let emailBoxContent
  let emailBox
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

  import confetti from "canvas-confetti";
  import { name } from "../../typescript/constants";
  let keepMeLoggedIn = false;
  const loginHandler = async (event) => {
    if (deviceType === "desktop") {
      ready = false;
    }
    const { randomInRange } = await import("@porkyproductions/hat/dist/randomInRange");
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
    const { randomInRange } = await import("@porkyproductions/hat/dist/randomInRange");
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
            <div transition:fade class="p-2 mb-6" on:click={window.localStorage.setItem("dismissedBanner", "true")} on:keydown={() => void(0)}>
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
        <Title />
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
              <div class="w-full max-w-xs" transition:fade>
                <div class=" flex content-center justify-center">
                  <form
                    on:submit|preventDefault={loginHandler}
                    class="p-8 shadow-md dark:bg-black border-primary-majorelleBlue border-4 rounded-lg dark:border-secondary-orangePantone"
                  >
                    <div class="mb-4">
                      <label class="form-label" for="email">Email</label>
                      <input
                        class="input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text"
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        bind:value={emailBoxContent}
                        bind:this={emailBox}
                        required
                      />
                    </div>
                    <div class="invalid-feedback">Email is Required!</div>
                    <div class="mb-6">
                      <label class="form-label" for="password">Password</label>
                      <input
                        class="input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text"
                        id="password"
                        type="password"
                        placeholder="******************"
                        required
                      />
                    </div>
                    <div class="mb-4">
                      <input type="checkbox" name="KeepMeLoggedIn" id="KeepMeLoggedIn" bind:checked={keepMeLoggedIn}>
                      <label for="KeepMeLoggeedIn">Keep Me Logged In</label>
                    </div>
                    <div>
                      <button type="submit" class="btn btn-primary"
                        >Sign In</button
                      >
                    </div>
                    {#if darkMode == true}
                      <div class="mt-3">
                        <button
                          type="button"
                          class="btn btn-dark"
                          on:click|preventDefault={loginWithGoogle}
                        >
                          <span
                            >Sign In with &nbsp;<span
                              ><i class="bi bi-google"/></span
                            ></span
                          >
                        </button>
                      </div>
                    {:else}
                      <div class="mt-3">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          on:click|preventDefault={loginWithGoogle}
                        >
                          <span
                            >Sign In with &nbsp;<span
                              ><i class="bi bi-google" /></span
                            ></span
                          >
                        </button>
                      </div>
                    {/if}
                    <div class="mt-3">
                      <button
                        type="button"
                        class="btn btn-info"
                        on:click|preventDefault={signInAnonomous}
                      >
                        <Icon name="person-slash"/>Sign In as a Guest
                      </button>
                    </div>
                    <div id="emailHelp" class="form-text">
                      By clicking 'sign in' you are agreeing to share your email
                      with PorkyProductions, which will be securely stored in our
                      servers, and will never be shared with anyone else.
                    </div>
                    <div class="mt-3">
                      <a
                        href="signUp.html"
                        type="button"
                        class="btn btn-secondary"><Icon name="person-plus"/>Sign Up</a
                      >
                    </div>
                  </form>
                </div>
              </div>
            {/if}
          </div>
        </div>
        <div class="flex content-center justify-center p-4 pb-10">
          <BsButton
            icon="arrow-left"
            iconAlt="a left facing arrow"
            text="Go back home"
            type="primary"
            href="index.html"
          />
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
