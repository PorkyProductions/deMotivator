<script>
    import './styles/css/app.css'
    import './styles/css/customProps.css'
    import './styles/scss/colorScheme.scss'
    import Button from './components/button.svelte';
    import Footer from './components/footer.svelte';
    import Title from './components/title.svelte';
    import Loader from './components/loader.svelte';
    // Loading Logic
    import { onDestroy } from "svelte";
    let ready = false;
    const load = async () => {
        let duration = randomInRange(1, 4000)
        await import('@capacitor/core')
        const { SplashScreen } = await import('@capacitor/splash-screen');
        await SplashScreen.show({
            showDuration: duration,
            autoHide: true,
        });
        const loadingTimer = setTimeout(() => ready = true, duration);
        onDestroy(() => clearTimeout(loadingTimer));
    }
    load();
    import {
        fade, slide, fly
    } from 'svelte/transition'
    import supportedBrowsers from './utils/supportedBrowsers';



    // FROM BEYOND THIS POINT IS FIREBASE LOGIC
    // BEWARE


import { initializeApp } from "firebase/app";
import { getAnalytics, setUserId } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {firebaseConfig} from './typescript/insults'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { randomInRange } from './utils/random';
  import { bsTheme } from './utils/darkMode';
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
</script>
<div id="root" data-bs-theme={bsTheme}>
    {#if !ready}
        <div transition:fade>
            <Loader />
        </div>
    {:else}
        <div transition:fade>
            <div class="dark:bg-theme-black dark:text-white" id="app">
                <Title />
                <Button />
            <div class="sm:p-3 md:p-4 lg:p-5 xl:p-20"></div>
                <div id="footer" class="" >
                    <Footer />
                </div>
            </div>
        </div>
    {/if}
</div>
