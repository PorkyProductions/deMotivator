<script lang="ts">
	import type { BsSpinnerProps } from './types';
	const { type }: BsSpinnerProps = $props();
</script>

<div class="flex content-center justify-center dark:bg-black">
	<div class="spinner-border absolute top-80 text-{type}" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
</div>
