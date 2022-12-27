<script>
  // Import generic stylesheets, essential libraries
  import "../../styles/css/app.css";
  import "../../styles/css/customProps.css";
  import "../../styles/scss/colorScheme.scss";
  import 'bootstrap/scss/bootstrap-reboot.scss'
  import "@capacitor/core";
  import "bootstrap/scss/bootstrap.scss";
  // Import components
  import BsSpinner from "../../components/bs-spinner.svelte";
  import Title from "../../components/title.svelte";
  import leftArrow from "bootstrap-icons/icons/arrow-left.svg";
  import info from "bootstrap-icons/icons/info-circle.svg";
  import person from "bootstrap-icons/icons/person-circle.svg";
  import google from "bootstrap-icons/icons/google.svg";
  import exclamation from "bootstrap-icons/icons/exclamation-octagon.svg";
  import check from "bootstrap-icons/icons/check2-circle.svg";
  // Import Misc Helpers
  import { onDestroy } from "svelte";
  import { darkMode } from "../../typescript/darkMode";
  import { randomInRange } from '../../typescript/random'
  import { deviceType } from 'uadetect'
  let emailBoxContent;
  let emailBox;
  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  // Loading Logic
  let ready = false;
    const load = async () => {
        let duration = randomInRange(1, 3500)
        const { SplashScreen } = await import('@capacitor/splash-screen');
        await SplashScreen.show({
            showDuration: duration,
            autoHide: true,
        });
        const loadingTimer = setTimeout(() => ready = true, duration);
        onDestroy(() => clearTimeout(loadingTimer));
    }
    load();

  // FROM BEYOND THIS POINT IS FIREBASE LOGIC
  // BEWARE

  import { initializeApp } from "firebase/app";
  import { getAnalytics, setUserId } from "firebase/analytics";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {firebaseConfig} from '../../typescript/insults'

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
  } from "firebase/auth";
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }
  import Auth from "./auth.svelte";
  import { fade } from "svelte/transition";
  import warning from "bootstrap-icons/icons/exclamation-diamond-fill.svg";
  import BsAlert from "../../components/bs-Alert.svelte";
  import BsModal from "../../components/bs-modal.svelte";
  import BsButton from "../../components/bsButton.svelte";

  let loginWithEmailPassword;
  let error = null;

  import confetti from "canvas-confetti";

  const loginHandler = async (event) => {
    if (deviceType === "desktop") {
      ready = false
    }
    const { randomInRange } = await import("../../typescript/random");
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
      load()
    } catch (err) {
      error = err;
    }
  };

  


  const deleteUser = async () => {
    const { deleteUser } = await import("firebase/auth");
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    const { showConfirm } = await import('../../typescript/easterEggs')
    const user = auth.currentUser;
    try {
      await Haptics.vibrate()
      await showConfirm("Are you sure?", "This is your last chance to back out.")
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
    const { randomInRange } = await import("../../typescript/random");
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
      await hapticsVibrate()
      await hapticsImpactMedium()
      i -= 1;
    }
  };
</script>

<Auth
  useRedirect={true}
  let:user
  let:loggedIn
  let:loginWithGoogle
  let:signInAnonomous
  bind:loginWithEmailPassword
  let:logout
>
  {#if !ready}
    {#if loggedIn}
      <BsSpinner type="success" />
    {:else}
      {#if error}
        <BsSpinner type="danger" />
      {/if}
      <BsSpinner type="primary" />
    {/if}
  {:else}
    <div id="wrapper" class="absolute top-0 bottom-0 right-0 left-0">
      {#if darkMode == true}
        <BsAlert
          icon={info}
          iconAlt="info"
          type="dark"
          text="By using (de)Motivator with an account, you consent to our, as well as Google's cookies."
          actionLink="https://policies.google.com/privacy"
          actionText="Learn More"
        />
        {#if error}
          <div transition:fade class="p-2 mb-6">
            <BsAlert
              icon={warning}
              iconAlt={warning}
              actionLink=" "
              actionText=" "
              type="danger"
              text={error.message ?? "An error occured. Try again"}
            />
          </div>
        {/if}
      {:else}
        <BsAlert
          icon={info}
          iconAlt="info"
          type="info"
          text="By using (de)Motivator with an account, you consent to our, as well as Google's cookies."
          actionLink="https://policies.google.com/privacy"
          actionText="Learn More"
        />
        {#if error}
          <div transition:fade class="p-2 mb-6">
            <BsAlert
              icon={warning}
              iconAlt={warning}
              actionLink=" "
              actionText=" "
              type="danger"
              text={error.message ?? "An error occured. Try again"}
            />
          </div>
        {/if}
      {/if}
      <Title />
      <div class="">
        <div class="wrapper flex content-center justify-center ">
          {#if loggedIn}
            <div class="w-full max-w-xs" id="loggedInUI" transition:fade>
              <div class="text-center">
                <img
                  src={user.picture ?? person}
                  alt="the profile of the user"
                  width="40%"
                  class="m-auto rounded-3xl dark:text-black"
                  draggable="false"
                  id="pfp"
                />
                <h1 class="font-bold font-primary">
                  {user.name ?? "Guest"}
                </h1>
                <h2 class="font-primary pb-4">{user.email ?? " "}</h2>
                <h2 class="font-primary">
                  Your (de)Motivator UserID:
                </h2>
                <h3 class="font-primary text-xl">
                  {user.id ?? " "}
                </h3>
                <button
                  type="button"
                  class="mt-3 btn btn-primary"
                  on:click={launchConfetti}
                >
                  Launch Confetti
                </button>
                <button
                type="button"
                class="mt-3 btn btn-warning"
                on:click={logout}>Logout</button
                >
                <div class="mt-3 pb-3">
                  <BsModal
                  preButtonText="Delete Account"
                  preButtonType="danger"
                  icon={warning}
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
                {#if user.emailVerified == true}
                  <div class="flex content-center justify-center">
                    <span>
                      <img src={check} alt="" />
                    </span>
                    &nbsp;
                    <span>
                      <p class="font-primary dark:text-white">
                        Email verified!
                      </p>
                    </span>
                  </div>
                  {:else}
                  <span>
                    <button class="btn btn-info inline" on:click={verifyEmail}>
                      {verifyEmailButtonText} 
                      </button>
                    </span>
                {/if}
                <div class="flex content-center justify-center p-4">
                  <a href="list.html" class="btn btn-secondary">
                    <div class="inline">
                      <span>View All Insults</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {:else}
            <div class="w-full max-w-xs" transition:fade>
              <div class=" flex content-center justify-center">
                <form
                on:submit|preventDefault={loginHandler}
                class="px-8 pt-6 pb-8 shadow-md dark:bg-black border-primary-majorelleBlue border-2 rounded-lg dark:border-secondary-orangePantone dark:border-2"
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
                  <div class="invalid-feedback">
                    Email is Required!
                  </div>
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
                            ><img class="inline" src={google} alt="" /></span
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
                            ><img class="inline" src={google} alt="" /></span
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
                      Sign In as a Guest
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
                      class="btn btn-secondary">Sign Up</a
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
          icon={leftArrow}
          iconAlt="a left facing arrow"
          text="Go back home"
          type="success"
          href="index.html"
        />
      </div>
    </div>
  {/if}
</Auth>

<style>
  div#wrapper {
      background-image: url(../../img/login-background-light.svg);
      color: hsl(0, 0%, 0%);
  }
  form, 
  div#loggedInUI {
    background-color: white;
  }
  @media (prefers-color-scheme: dark) {
    div#wrapper {
      background-image: url(../../img/login-background-dark.svg);
      color: hsl(0, 0%, 100%);
    }
    form, 
    div#loggedInUI {
      background-color: black;
    }
    #pfp {
      background-color: white;
    }
  }
</style>
