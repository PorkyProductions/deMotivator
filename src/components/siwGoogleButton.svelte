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
import loggedIn from '../pages/login/auth.svelte'
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getAuth } from 'firebase/auth'


import personPlus from 'bootstrap-icons/icons/person-plus.svg'
import person from 'bootstrap-icons/icons/person.svg'
</script>


{#if loggedIn}
<a href="/login.html" class="flex justify-between content-center bg-white hover:bg-gray-200 text-black p-2 rounded-lg">
        <p class="text-sm lg:text-md leading-3 hover:text-gray-700 visited:text-purple-900 hover:visited:text-primary-majorelleBlue dark:hover:visited:text-secondary-orangePantone">View Account</p> <img src={person} alt="person">
</a>
{:else if !loggedIn}
    <a href="/login.html" class="flex justify-between content-center bg-white hover:bg-gray-200 text-black p-2 rounded-lg">
        <p class="text-sm lg:text-md leading-3 hover:text-gray-700 visited:text-purple-900 hover:visited:text-primary-majorelleBlue dark:hover:visited:text-secondary-orangePantone">Sign In</p> <img src={personPlus} alt="person with a plus sign next to them">
    </a>
{/if}