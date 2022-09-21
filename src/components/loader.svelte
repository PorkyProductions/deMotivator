<script>
    import { onDestroy } from "svelte";
    import Spinhog from "./spinhog.svelte";

    let ready = false;
    const loadingTimer = setTimeout(()=> ready = true, 1000);
    onDestroy(()=> clearTimeout(loadingTimer));
</script>

{#if !ready}
    <Spinhog />
{/if}