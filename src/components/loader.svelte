<script>
    import { onDestroy } from "svelte";
    import Spinhog from "./spinhog.svelte";

    let ready = false;
    const load = async () => {
        let duration = 1000
        const { SplashScreen } = await import('@capacitor/splash-screen');
        await SplashScreen.show({
            showDuration: duration,
            autoHide: true,
        });
        const loadingTimer = setTimeout(() => ready = true, duration);
        onDestroy(() => clearTimeout(loadingTimer));
    }
</script>

{#if !ready}
    <Spinhog />
{/if}