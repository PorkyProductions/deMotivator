<script lang="ts">
	import Title from '../../../components/title.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="py-8 px-4" transition:fade>
	<div class="container">
		<div class="text-center">
			<a href="/" class="text-decoration-none">
				<Title />
			</a>
		</div>
	</div>
</div>
