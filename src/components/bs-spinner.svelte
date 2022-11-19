<script>
    import 'bootstrap/dist/css/bootstrap.css'
    export let type;
    import { darkMode } from '../typescript/darkMode';
</script>

<div class="dark:bg-black">
    {#if !darkMode}
        <div class="flex content-center justify-center">
            <div class="spinner-border absolute top-80 text-{type}" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {:else}
        <div class="flex content-center justify-center bg-black">
            <div class="spinner-grow absolute top-80 text-{type}" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {/if}
</div>
