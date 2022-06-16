<script lang="ts">
    import '../app.css';
    import { DEVICE_type } from 'uadetect'
</script>


<main class="bg-primary-majorelleBlue dark:bg-purple-900">
    {#if DEVICE_type === 'mobile'}
        <div>
        </div>
    {/if}
    <div class="flex justify-between items-center font-semibold text-2xl">
        <a href="https://porkyproductions.github.io" class="hover:bg-purple-400 dark:hover:bg-purple-700 hover:rounded-xl"><img src="../img/HedgehogIcon.png" alt="hedgehog"></a>
    </div>
    
</main>

<style>
    img {
        width: 100px;
    }
</style>