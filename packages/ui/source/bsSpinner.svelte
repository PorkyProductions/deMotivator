<script lang="ts">
	import type { BsSpinnerProps } from './types';
	const { type, darkMode = false }: BsSpinnerProps = $props();
</script>

{#if !darkMode}
	<div class="flex content-center justify-center">
		<div class="spinner-border absolute top-80 text-{type}" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
{:else}
	<div class="flex content-center justify-center bg-gray-900">
		<div class="spinner-grow absolute top-80 text-{type}" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
{/if}
