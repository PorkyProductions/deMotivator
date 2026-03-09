<script lang="ts">
	import type { IconProps } from './types';
	const { name }: IconProps = $props();
</script>

<i class="bi bi-{name}"></i>&nbsp;

<style lang="scss">
	i {
		font-style: normal;
	}
</style>
