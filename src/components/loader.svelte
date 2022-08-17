<script>
    import { onDestroy } from "svelte";
    import Spinhog from "./spinhog.svelte";

    let ready = false;
    const timeoutId = setTimeout(()=> ready= true, 1000);
    onDestroy(()=>clearTimeout(timeoutId));
</script>

{#if !ready}
    <Spinhog />
{/if}