<script lang="ts">
	import {leaderboard} from '../../typescript/readInsults'
	import Title from '../../components/title.svelte'
	import { onMount, beforeUpdate } from 'svelte'
	import { getListOfAllUsersWhoHaveSeenInsults } from '../../typescript/readInsults'

	// Loader Logic
	let ready = false
	const load = async () => {
		const { SplashScreen } = await import("@capacitor/splash-screen");
		const { onDestroy } = await import('svelte')
		const { randomInRange } = await import('../../utils/random')
		let duration = randomInRange(1, 3500);
		await SplashScreen.show({
			showDuration: duration,
			autoHide: true,
		});
		const loadingTimer = setTimeout(() => (ready = true), duration);
		onDestroy(() => clearTimeout(loadingTimer));
	};
	load();
	onMount(async () => await getListOfAllUsersWhoHaveSeenInsults())
	beforeUpdate(async () => await getListOfAllUsersWhoHaveSeenInsults())
</script>

<Title />
<div class="text-white">
	{#each leaderboard as entry}
		<div class="pb-4">
			{entry.insultsSeen}
		</div>
	{/each}
</div>