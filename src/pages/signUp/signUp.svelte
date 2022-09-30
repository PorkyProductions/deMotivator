<script>
    import '../../app.css'
    import '../../cursor.css'
    import Title from '../../components/title.svelte';
    import '@capacitor/core'
    import 'bootstrap/dist/css/bootstrap.css'
    import leftArrow from 'bootstrap-icons/icons/arrow-left.svg'
    // Loading Logic
    import { onDestroy } from "svelte";
    let ready = false;
    const timeoutId = setTimeout(()=> ready = true, 1000);
    onDestroy(() => clearTimeout(timeoutId));
    const auth = getAuth();



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
import Auth from '../login/auth.svelte';
import { fade } from 'svelte/transition';
import warning from 'bootstrap-icons/icons/exclamation-diamond-fill.svg'

let loginWithEmailPassword;
let error = null;

const signUpHandler = async (event) => {
    const { createUserWithEmailAndPassword } = await import("firebase/auth")
    const { userEmail, userPassword } = event.target.elements;
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
    // Signed in 
        const user = userCredential.user;
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
        errorCode,
        errorMessage
    }
    // ..
    });
    window.location.href="login.html"
};
const errorMessage2 = signUpHandler()
</script>
<Title />
<div class="">
    <div class="wrapper flex content-center justify-center ">
          <div class="w-full max-w-xs">
            <div class=" flex content-center justify-center">
              <form
              on:submit|preventDefault={signUpHandler}
              class="px-8 pt-6 pb-8 shadow-md"
            >
              <div class="mb-4">
                <label for="userEmail">Email</label>
                <input
                  class="hover:border-secondary-orangePantone focus:border-primary-majorelleBlue dark:focus:border-secondary-orangePantone"
                  id="userEmail"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div class="mb-6">
                <label for="userPassword">Password</label>
                <input
                  class="input-field"
                  id="userPassword"
                  type="password"
                  placeholder="******************"
                />
              </div>
              {#if error}
                <div transition:fade class="p-2 mb-6 alert alert-danger"><img src={warning} alt="warning"> {errorMessage2}</div>
              {/if}
              <div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
              </div>
            </form>
            </div>
          </div>
    </div>
    <div class="flex content-center justify-center p-4">
      <a href="index.html" class="btn btn-success"> <img src={leftArrow} alt=""> Go Back Home</a>
    </div>
</div>

