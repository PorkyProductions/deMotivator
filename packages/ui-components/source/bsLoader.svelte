<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { BsLoaderProps } from './types';

	const { type, loadingTime }: BsLoaderProps = $props();

	let value = $state(0);
	let timeUntil100Percent = $state(0);
	let loadingPercentCalc: number | undefined;

	onMount(() => {
		value = 0;
		timeUntil100Percent = 10000 / loadingTime;
		loadingPercentCalc = setInterval(() => {
			value += timeUntil100Percent;
		}, 100);
	});

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
		style="width: {value}%">
	</div>
</div>
<div class="text-center font-primary p-4">
	{
		Math.round(value) > 100
			? 100
			: Math.round(value)
	}%
</div>
