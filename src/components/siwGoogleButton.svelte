<script>
    // Import the functions you need from the SDKs you need
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

import google from 'bootstrap-icons/icons/google.svg'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getAuth } from 'firebase/auth'

// Login Starts Here
// We need the state of the logged in user
export let loggedIn = false
const auth = getAuth();
export const loginFunction = async () => {
    const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth")
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
};


// This following block of code gets the basic metadata about the user

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


// The logout function
// TODO: Make it functionally callable 

export const logoutFunction = async (auth) => {
    const { signOut } = await import('firebase/auth');
    signOut(auth).then(() => {
        loggedIn = false
    }).catch((error) => {
        alert(`An Error Occured. Here is the error: ${error}`)
    });
};
</script>


{#if user !== null}
<button on:click={logoutFunction} class="flex justify-between content-center bg-white hover:bg-gray-200 text-black p-4 rounded-lg">
        <p>Sign Out {user.displayName}</p>
</button>
{:else if user == null}
    <button on:click={loginFunction} class="flex justify-between content-center bg-white hover:bg-gray-200 text-black p-4 rounded-lg">
        <p>Sign In with</p> <br> <img src={google} alt="Google">
    </button>
{/if}