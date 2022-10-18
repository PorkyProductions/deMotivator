<script>
    import '../../styles/css/app.css'
    import '../../styles/css/customProps.css'
    import '../../styles/scss/colorScheme.scss'
    import Title from '../../components/title.svelte';
    import '@capacitor/core'
    import 'bootstrap/dist/css/bootstrap.css'
    import leftArrow from 'bootstrap-icons/icons/arrow-left.svg'
    // Loading Logic
    import { onDestroy } from "svelte";
    let ready = false;
    const timeoutId = setTimeout(()=> ready = true, 1500);
    onDestroy(() => clearTimeout(timeoutId));
    import BsSpinner from '../../components/bs-spinner.svelte';



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
import Auth from './auth.svelte';
import { fade } from 'svelte/transition';
import warning from 'bootstrap-icons/icons/exclamation-diamond-fill.svg'

let loginWithEmailPassword;
let error = null;

const loginHandler = async (event) => {
    const { email, password } = event.target.elements;
    try {
        error = null;
        await loginWithEmailPassword(email.value, password.value);
    } catch (err) {
        error = err;
    }
};
</script>

{#if !ready}
<BsSpinner type="primary" />
{:else}
<div id="wrapper" class="pb-56">
  <Title />
<h3 class="text-center font-primary font-light">
  Log In
</h3>
<div class="">
  <div class="wrapper flex content-center justify-center ">
    <Auth
        useRedirect={true}
        let:user
        let:loggedIn
        let:loginWithGoogle
        let:signInAnonomous
        bind:loginWithEmailPassword
        let:logout
    >
    {#if loggedIn}
        <div class="w-full max-w-xs" transition:fade>
            <div class="text-center">
                <img src={user.picture} alt="" class="m-auto">
                <h1 class="font-bold font-primary">
                  {user.name ?? "Guest"}
                </h1>
                <h2 class="font-primary">{user.email ?? " "}</h2>
                <button type="button" class="mt-3 btn btn-warning" on:click={logout}>Logout</button>
            </div>
        </div>
    {:else}
          <div class="w-full max-w-xs" transition:fade>
            <div class=" flex content-center justify-center">
              <form
              on:submit|preventDefault={loginHandler}
              class="px-8 pt-6 pb-8 shadow-md border-primary-majorelleBlue border-2 rounded-lg dark:border-secondary-orangePantone dark:border-2"
            >
              <div class="mb-4">
                <label class="form-label" for="email">Email</label>
                <input
                  class="input-field form-control dark:bg-black"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div class="mb-6">
                <label class="form-label" for="password">Password</label>
                <input
                  class="input-field form-control dark:bg-black"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              {#if error}
                <div transition:fade class="p-2 mb-6 alert alert-danger"><img src={warning} alt="warning"> {error.message}</div>
              {/if}
              <div>
                <button type="submit" class="btn btn-primary">Sign In</button>
              </div>
              <div class="mt-3">
                <button type="button" class="btn btn-outline-dark" on:click|preventDefault={loginWithGoogle}>
                  Sign In with Google
                </button>
              </div>
              <div class="mt-3">
                <button type="button" class="btn btn-outline-info" on:click|preventDefault={signInAnonomous}>
                  Sign In as a Guest
                </button>
              </div>
              <div id="emailHelp" class="form-text">By clicking 'sign in' you are agreeing to share your email with PorkyProductions, which will be securely stored in our servers, and will never be shared with anyone else.</div>
              <div class="mt-3">
                <a href="signUp.html" type="button" class="btn btn-secondary">Sign Up</a>
              </div>
            </form>
            </div>
          </div>
        {/if}
      </Auth>
    </div>
    <div class="flex content-center justify-center p-4 pb-10">
      <a href="index.html" class="btn btn-outline-success"> <img src={leftArrow} alt=""> Go Back Home</a>
    </div>
</div>
</div>
{/if}





<style>
  @media (prefers-color-scheme: dark) {
      div#wrapper {
        background-color: hsl(0, 0%, 0%);
        color: hsl(0, 0%, 100%);
      }
  }
</style>