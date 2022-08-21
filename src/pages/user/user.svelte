<script>
    import '../../app.css'



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
import loggedIn from '../../App.svelte'
import displayName from '../../App.svelte'
import photoURL from '../../App.svelte'
import SiwGoogleButton from '../../components/siwGoogleButton.svelte';
import Title from '../../components/title.svelte';
</script>

{#if loggedIn}
    <Title />
    <p class="text-center font-semibold text-3xl dark:text-white">
        account. {displayName}
    </p>
{:else}
    <SiwGoogleButton />
{/if}

<style>

</style>