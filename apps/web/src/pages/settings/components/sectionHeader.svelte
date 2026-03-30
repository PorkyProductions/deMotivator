<script lang="ts">
	import { Icon } from '@demotivator/ui';

	const {
		icon,
		title,
		description,
		step
	}: {
		icon?: string;
		title: string;
		description: string;
		step?: number;
	} = $props();
</script>

<div class="section-header mb-3 mt-5">
	<div class="d-flex align-items-center gap-3 mb-1">
		{#if step !== undefined}
			<span class="section-step-badge">{step}</span>
		{:else}
			<span class="section-icon-wrap">
				<Icon name={icon} />
			</span>
		{/if}
		<h2 class="h4 fw-bold mb-0">{title}</h2>
	</div>
	<p class="text-muted small mb-0 ps-1">
		{description}
	</p>
</div>

<style>
	.section-icon-wrap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgb(79 70 229 / 12%);
		color: #4f46e5;
		font-size: 1rem;
		flex-shrink: 0;
	}

	:global([data-bs-theme='dark']) .section-icon-wrap {
		background: rgb(79 70 229 / 25%);
		color: #818cf8;
	}

	.section-step-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #4f46e5;
		color: #fff;
		font-size: 0.875rem;
		font-weight: 700;
		flex-shrink: 0;
	}
</style>
