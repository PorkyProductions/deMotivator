<script lang="ts">
	import type { BsButtonProps } from './types';
	import Icon from './icon.svelte';
	const { href, type, text, icon }: BsButtonProps = $props();
</script>

<a href={href} id="bsButton" class="btn btn-{type}"><Icon name={icon} />{text}</a>
