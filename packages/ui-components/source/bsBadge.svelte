<script lang="ts">
	import type { BsBadgeProps } from './types';
	const { type, text }: BsBadgeProps = $props();
</script>

<span class="badge bg-{type}">{text}</span>
