<script>
  // Import generic stylesheets, essential libraries
    import '../../styles/css/app.css'
    import '../../styles/css/customProps.css'
    import '../../styles/scss/colorScheme.scss'
    import '@capacitor/core'
    import 'bootstrap/dist/css/bootstrap.css'
    import confetti from 'canvas-confetti'
    // Import components
    import Title from '../../components/title.svelte';
    import BsSpinner from '../../components/bs-spinner.svelte';
    import Auth from '../login/auth.svelte';
    import leftArrow from 'bootstrap-icons/icons/arrow-left.svg'
    import BsAlert from '../../components/bs-Alert.svelte';
    // Import Icons
    import warning from 'bootstrap-icons/icons/exclamation-diamond-fill.svg'
    import info from 'bootstrap-icons/icons/info-circle.svg'
    // Import Misc Helpers
    import { fade } from 'svelte/transition';
    import { onDestroy } from "svelte";
    import { darkMode } from '../../typescript/darkMode'

    // Loading Logic
    let ready = false;
    const timeoutId = setTimeout(()=> ready = true, 1500);
    onDestroy(() => clearTimeout(timeoutId));





  // FROM BEYOND THIS POINT IS FIREBASE LOGIC
  // BEWARE


import { initializeApp } from "firebase/app";
import { getAnalytics, setUserId } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",
authDomain: "demotivator-3cf4d.firebaseapp.com",
projectId: "demotivator-3cf4d",
storageBucket: "demotivator-3cf4d.appspot.com",
messagingSenderId: "230067629772",
appId: "1:230067629772:web:682830de35cc6b7be91c69",
measurementId: "G-T182ZXMZM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
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

const signUp = async (auth, email, password) => {
  const { getAuth, createUserWithEmailAndPassword, sendEmailVerification } = await import("firebase/auth");
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    sendEmailVerification(auth.currentUser)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
let error = null;
let agreedToTerms = false;

const signUpHandler = async (event) => {
  const { randomInRange } = await import('../../typescript/random')
  const { email, password } = event.target.elements;
  try {
      error = null;
      if (!agreedToTerms) {
        throw new Error("You must agree to the terms and conditions before signing up!")
      }
      await signUp(auth, email.value, password.value);
      for (let i = 0; i <= 3; i++) {
        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
            origin: { y: 0.6 }
        });
      }
  } catch (err) {
      error = err;
  }
};
</script>
<Auth
      useRedirect={true}
      let:user
      let:loggedIn
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
<div id="wrapper" class="pb-56">
  {#if darkMode == true}
  <BsAlert icon={info} iconAlt="info" type="dark" text="By using (de)Motivator with an account, you consent to our, as well as Google's cookies." actionLink="https://policies.google.com/privacy" actionText="Learn More"  />
    {#if error}
      <div transition:fade class="p-2 mb-6">
        <BsAlert icon={warning} iconAlt={warning} actionLink=" " actionText=" " type="danger" text={error.message ?? "An error occured. Try again"} />
      </div>
    {/if}
  {:else}
  <BsAlert icon={info} iconAlt="info" type="info" text="By using (de)Motivator with an account, you consent to our, as well as Google's cookies." actionLink="https://policies.google.com/privacy" actionText="Learn More" />
    {#if error}
      <div transition:fade class="p-2 mb-6">
        <BsAlert icon={warning} iconAlt={warning} actionLink=" " actionText=" " type="danger" text={error.message ?? "An error occured. Try again"} />
      </div>
    {/if}
  {/if}
<Title />
<h3 class="text-center font-primary font-light">
Sign Up
</h3>
<div class="">
<div class="wrapper flex content-center justify-center ">
  {#if loggedIn}
    {window.location.href="login.html"}
  {:else}
        <div class="w-full max-w-xs" transition:fade>
          <div class=" flex content-center justify-center">
            <form
            on:submit|preventDefault={signUpHandler}
            class="px-8 pt-6 pb-8 shadow-md border-primary-majorelleBlue border-2 rounded-lg dark:border-secondary-orangePantone dark:border-2"
          >
            <div class="mb-4">
              <label class="form-label" for="email">Email</label>
              <input
                class="input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text"
                id="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div class="mb-6">
              <label class="form-label" for="password">Password</label>
              <input
                class="input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text"
                id="password"
                type="password"
                placeholder="******************"
              />
            </div>
            <div class="form-check pb-4">
              <input class="form-check-input" type="checkbox" bind:checked={agreedToTerms} value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                I agree to the <a href=" ">Terms and Conditions</a> and <a href="https://policies.google.com/privacy">Privacy Policy</a>
              </label>
            </div>
            <div>
              <button type="submit" class="btn btn-primary">Sign Up</button>
            </div>
            <div id="emailHelp" class="form-text">By clicking 'sign up' you are agreeing to share your email with PorkyProductions, which will be securely stored in our servers, and will never be shared with anyone else.</div>
            <div class="mt-3">
              <a href="login.html" type="button" class="btn btn-secondary">Sign In</a>
            </div>
          </div>
            </div>
            {/if}
          </div>
          <div class="flex content-center justify-center p-4 pb-10">
            <a href="index.html" class="btn btn-outline-success"> <img src={leftArrow} alt=""> Go Back Home</a>
          </div>
</div>
</div>
{/if}
</Auth>





<style>
@media (prefers-color-scheme: dark) {
    div#wrapper {
      background-color: hsl(0, 0%, 0%);
      color: hsl(0, 0%, 100%);
    }
}
</style>