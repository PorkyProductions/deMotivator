<script lang="ts">
	import type { InsultDBQueryResponse } from '../../typescript/types';
	import type { QuerySnapshot } from 'firebase/firestore';
	import Title from '../../components/title.svelte'
	import { onMount, beforeUpdate } from 'svelte'

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


	// Getting Data
	let datas: null | QuerySnapshot<InsultDBQueryResponse> = null
	let leaderboard: InsultDBQueryResponse[] = []
	const refreshInsultLeaderboard = async () => {
		const { getListOfAllUsersWhoHaveSeenInsults } = await import('../../typescript/readInsults')
		datas = await getListOfAllUsersWhoHaveSeenInsults();
		datas.forEach((doc) => leaderboard.push(doc.data()))
		console.log("SCOREBOARD: ", leaderboard)
	}
	onMount(async () => refreshInsultLeaderboard())
	beforeUpdate(async () => refreshInsultLeaderboard())
</script>

<Title />
{#each leaderboard as rank}
	<div>{rank.data}</div>
{/each}