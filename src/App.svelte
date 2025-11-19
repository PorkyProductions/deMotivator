<script lang="ts">
    import './styles/css/app.css'
    import './styles/css/customProps.css'
    import './styles/scss/colorScheme.scss'
    import Button from './components/button.svelte';
    import Footer from './components/footer.svelte';
    import Title from './components/title.svelte';
    import Loader from './components/loader.svelte'
    import { importCapacitor } from './utils/capacitor';
    import { randomInRange } from '@porkyproductions/hat/randomInRange';
    import { fade } from 'svelte/transition'
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    import {firebaseConfig} from './typescript/insults'
    import { print } from '@porkyproductions/hat/print'
    import { bsTheme } from './utils/darkMode';
    import HomeScreenDevWarningBanner from './components/homeScreenDevWarningBanner.svelte';
    
    let ready = false;

    const load = async () => {
        let duration = randomInRange(1, 4000);
        // Use safe import helper so removing Capacitor later won't break runtime
        const mod = await importCapacitor('@capacitor/splash-screen');
        if (mod && mod.SplashScreen && typeof mod.SplashScreen.show === 'function') {
            try {
                await mod.SplashScreen.show({
                    showDuration: duration,
                    autoHide: true,
                });
            } catch (e) {
                console.warn('SplashScreen.show failed', e);
            }
            setTimeout(async () => {
                ready = true;
                try { await mod.SplashScreen.hide(); } catch (e) { /* ignore */ }
            }, duration);
            return;
        }

        // no splash-screen available — just set ready after duration
        setTimeout(() => { ready = true; }, duration);
    };
    load();

    // FROM BEYOND THIS POINT IS FIREBASE LOGIC
    // BEWARE

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    print(analytics)
  


</script>
<div id="root" data-bs-theme={bsTheme}>
    {#if !ready}
        <div transition:fade>
            <Loader />
        </div>
    {:else}
        <div transition:fade>
            <div class="dark:bg-theme-black dark:text-white" id="app">
                {#if window.location.hostname === "localhost" || window.location.hostname === "demotivator-dev.web.app"}
                    <HomeScreenDevWarningBanner />  
                {/if}
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
