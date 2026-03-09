<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from './icon.svelte';
	import type { BsAlertProps } from './types';

	const load = async () => {
		await import('bootstrap/js/dist/alert');
	};

	const { type, icon, text, actionLink, actionText }: BsAlertProps = $props();
</script>

<div transition:fade class="alert alert-{type} d-flex align-items-center alert-dismissible" role="alert" onmouseover={load} onfocus={load}>
	<span>
		<Icon name={icon} />
	</span>
	&nbsp;
	<span>
		{text}
	</span>
	&nbsp;
	<span>
		<a class="alert-link" href={actionLink}>{actionText}</a>
	</span>
	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
