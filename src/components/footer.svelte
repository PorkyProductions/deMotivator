<script lang="ts">
    import '../app.css';
    const logo =  '../img/HedgehogIcon.png';
    import { DEVICE_type } from 'uadetect'
</script>


<main class="bg-primary-majorelleBlue dark:bg-purple-900 rounded-t-xl">
    {#if DEVICE_type === 'mobile'}
        <div>
        </div>
    {/if}
    {#if DEVICE_type === 'desktop'}
    <div class="font-semibold text-2xl">
        <div>
            <a href="https://porkyproductions.github.io" class="hover:bg-indigo-400 dark:hover:bg-purple-700 hover:rounded-xl"><img src={logo} alt="hedgehog" class="text-center m-auto hover:bg-indigo-400 dark:hover:bg-purple-700 hover:rounded-xl"></a>
        </div>
        <div class="flex justify-center content-center">
            <p class="text-white">
                a PorkyProductions product
            </p>
        </div>
    </div>
    {/if}
    
</main>

<style>
    img {
        width: 100px;
    }
</style>