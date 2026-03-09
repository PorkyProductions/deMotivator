<script lang="ts">
	import { Icon } from '@demotivator/ui';

	const {
		icon,
		title,
		description
	}: {
		icon: string;
		title: string;
		description: string;
	} = $props();
</script>

<div class="mb-2">
	<h2 class="h4 mb-1">
		<Icon name={icon} /> {title}
	</h2>
	<p class="text-muted small mb-3">
		{description}
	</p>
</div>
