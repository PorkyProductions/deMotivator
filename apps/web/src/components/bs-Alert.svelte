<script lang="ts">
	import '../styles/scss/darkMode.scss';
	import { type BSVarient } from '../typescript/types';
	const { type, icon, text, actionLink, actionText }: { type: BSVarient; icon: string; text: string; actionLink: string; actionText: string } = $props();
	const load = async () => {
		await import('bootstrap/js/dist/alert');
	};
	import { fade } from 'svelte/transition';
import Icon from './icon.svelte';
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
