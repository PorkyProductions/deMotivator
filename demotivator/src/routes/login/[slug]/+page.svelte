<script lang="ts">
  import type { PageData } from './$types';
  import Auth from '../auth.svelte';

  export let data: PageData;
</script>
<Auth let:loggedIn>
  {#if loggedIn}
    <h1>{data.insultsSeen || "None"}</h1>
  {:else}
    <span></span>
  {/if}
</Auth>
