<script lang="ts">
    import './styles/css/app.css'
    import './styles/css/customProps.css'
    import './styles/scss/colorScheme.scss'
    import Button from './components/button.svelte';
    import Footer from './components/footer.svelte';
    import Title from './components/title.svelte';
    import Loader from './components/loader.svelte'
    let ready = false;
    const load = async () => {
        let duration = randomInRange(1, 4000)
        await import('@capacitor/core')
        const { SplashScreen } = await import('@capacitor/splash-screen');
        await SplashScreen.show({
            showDuration: duration,
            autoHide: true,
        });
        setTimeout(async () => {
            ready = true;
            await SplashScreen.hide()
        }, duration);
    }
    load();
    import {
        fade
    } from 'svelte/transition'



    // FROM BEYOND THIS POINT IS FIREBASE LOGIC
    // BEWARE


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {firebaseConfig} from './typescript/insults'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { print } from '@porkyproductions/hat/print'
print(analytics)


import { randomInRange } from '@porkyproductions/hat/randomInRange';
import { bsTheme } from './utils/darkMode';



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
