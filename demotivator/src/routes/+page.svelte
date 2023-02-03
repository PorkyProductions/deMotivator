<script>
    import '../styles/css/app.css'
    import '../styles/css/customProps.css'
    import '../styles/scss/colorScheme.scss'
    import Button from '../components/button.svelte';
    import Footer from '../components/footer.svelte';
    import Title from '../components/title.svelte';
    import Loader from '../components/loader.svelte';
    import '@capacitor/core'
    // Loading Logic
    let ready = false;
    const load = async () => {
        const { randomInRange } = await import('../utils/random')
        const { SplashScreen } = await import('@capacitor/splash-screen');
        let duration = randomInRange(1, 4000)
        const loadingTimer = setTimeout(() => ready = true, duration);
        await SplashScreen.show({
            showDuration: duration,
            autoHide: true,
        });
    }
    load();
    import {
        fade
    } from 'svelte/transition'
    import supportedBrowsers from '../typescript/supportedBrowsers';
  import { onDestroy } from 'svelte';
</script>
{#if !ready}
    <div transition:fade>
        <Loader />
    </div>
    {:else}
    <div transition:fade>
        <div class="dark:bg-black dark:text-white" id="app">
            <Title />
            <Button />
        <div class="sm:p-3 md:p-4 lg:p-5 xl:p-20">
            </div>
            <div id="footer" class="" >
                <Footer />
            </div>
        </div>
    </div>
{/if}
