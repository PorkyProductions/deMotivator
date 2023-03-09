<script lang="ts">
  import '../styles/scss/darkMode.scss'
  export let type: BSVarient;
  export let loadingTime: number;
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import { BSVarient } from "../typescript/types";
  let elapsedTime = 0;
  let value = 0;
  let timeUntil100Percent = 10000 / loadingTime;
  onMount(() => {
    elapsedTime = 0;
    value = 0
    timeUntil100Percent = 10000 / loadingTime
  })

  const loadingPercentCalc = setInterval(() => {
    value += timeUntil100Percent;
    elapsedTime += 1;
  }, 100);
  onDestroy(() => clearInterval(loadingPercentCalc));
</script>

<div
  transition:fade
  class="progress"
  role="progressbar"
  aria-label="Loading"
  aria-valuenow={value}
>
  <div
    class="progress-bar progress-bar-striped progress-bar-animated bg-{type}"
    style="width: {value}%"
  />
</div>
<div class="text-center font-primary p-4">
    {
        Math.round(value) > 100 
        ? 100 
        : Math.round(value)
    }%
</div>
