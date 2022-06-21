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
        <div class="flex justify-between content-center pl-56 pr-80">
            <p class="text-white ">
                a PorkyProductions product
            </p>
            <a class="text-white hover:bg-indigo-400 dark:hover:bg-purple-700 hover:rounded-xl" href="dmv1.html">(de)Motivator 1.0</a>
            <a class="text-white hover:bg-indigo-400 dark:hover:bg-purple-700 hover:rounded-xl" href="http://github.com/PorkyProductions/deMotivator.js">(de)Motivator.js</a>
        </div>
    </div>
    {/if}
    
</main>

<style>
    img {
        width: 100px;
    }
</style>