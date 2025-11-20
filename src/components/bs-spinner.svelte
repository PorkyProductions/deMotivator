<script lang="ts">
    import '../styles/scss/darkMode.scss'
    import type { BSVarient } from '../typescript/types';
    let { type }: { type: BSVarient } = $props();
    import { darkMode } from '../utils/darkMode';
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
