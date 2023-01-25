<script>
  import "bootstrap/scss/bootstrap.scss";
  export let type;
  export let loadingTime;
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
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
    if (elapsedTime === time) {
      clearInterval(loadingPercentCalc);
    }
  }, 100);
  onDestroy(() => clearInterval(loadingPercentCalc));
</script>

<div
  transition:fade
  class="progress"
  role="progressbar"
  aria-label="Animated striped example"
  aria-valuenow={value}
  aria-valuemin="0"
  aria-valuemax="100"
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
