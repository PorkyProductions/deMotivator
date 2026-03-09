<script lang="ts">
	import { Icon } from '@demotivator/ui-components';
	import { fade } from 'svelte/transition';
</script>

<div class="text-center" transition:fade>
	<hr class="my-4" />
	<h5 class="text-muted mb-3">Lost? Here are some helpful links:</h5>
	<div class="d-flex gap-2 justify-content-center flex-wrap">
		<a href="/" class="btn btn-outline-secondary">
			<Icon name="house" /> Home
		</a>
		<a href="/account.html" class="btn btn-outline-secondary">
			<Icon name="person" /> Account
		</a>
		<a href="/leaderboard.html" class="btn btn-outline-secondary">
			<Icon name="trophy" /> Leaderboard
		</a>
		<a href="/list.html" class="btn btn-outline-secondary">
			<Icon name="list-ul" /> All Insults
		</a>
	</div>
</div>
