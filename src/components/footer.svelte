<script lang="ts">
    import '../app.css';
    const logo =  '../img/HedgehogIcon.png';
    import { DEVICE_type } from 'uadetect'
import SiwGoogleButton from './siwGoogleButton.svelte';
    export let loggedIn = false
</script>

{#if DEVICE_type === 'mobile'}
<!--Deadspace to cover entire screen on mobile devices-->
        <div class="pb-96">
            <div class="pb-24">

            </div>
        </div>
    {/if}
{#if DEVICE_type === 'desktop'}
<main class="bg-primary-majorelleBlue dark:bg-secondary-orangePantone rounded-t-xl">
    <div class="font-semibold text-2xl">
        <div>
            <a href="https://porkyproductions.github.io" class="hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"><img src={logo} alt="hedgehog" class="text-center m-auto hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl"></a>
        </div>
        <div class="flex justify-between content-center pl-56 pr-80">
            <p class="text-white ">
                a PorkyProductions product
            </p>
            <a class="text-white hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl" href="dmv1.html">(de)Motivator 1.0</a>
            <a class="text-white hover:bg-indigo-400 dark:hover:bg-orange-700 hover:rounded-xl" href="http://github.com/PorkyProductions/deMotivator.js">(de)Motivator.js</a>
            {#if loggedIn}
                <div></div>
            {:else if !loggedIn}
            <SiwGoogleButton />
            {/if}
        </div>
    </div>
</main>
{/if}

<style>
    img {
        width: 100px;
    }
</style>