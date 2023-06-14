<script lang="ts">
	import {leaderboard} from '../../typescript/readInsults'
	import { getListOfAllUsersWhoHaveSeenInsults as getList } from '../../typescript/readInsults'
	import { afterUpdate } from 'svelte';
	import {randomInRange} from '@porkyproductions/hat'
	import { fade } from 'svelte/transition';
	import { name } from '../../typescript/constants';
	import { bsTheme } from '../../utils/darkMode';


	import Title from '../../components/title.svelte'
	import BsButton from '../../components/bsButton.svelte';
	import BsLoader from '../../components/bsLoader.svelte';



	// Loader Logic
	let ready = false
	let duration = randomInRange(1, 3500);
	const load = async (d: number = duration) => {
		const { SplashScreen } = await import("@capacitor/splash-screen");
		const { onDestroy } = await import('svelte')
		await SplashScreen.show({
			showDuration: d,
			autoHide: true,
		});
		const loadingTimer = setTimeout(() => (ready = true), d);
		onDestroy(() => clearTimeout(loadingTimer));
	};
	load();
	afterUpdate(async () => await getList())
</script>

<div id="root" data-bs-theme={bsTheme}>
	<div class="" transition:fade>
		{#if ready}
			<div class="text-4xl">
				<Title />
			</div>
			<h1 class="text-xl font-medium font-primary text-center">
				Leaderboard
			</h1>
			<div class="flex content-center justify-center p-4">
				<button on:click={getList} on:keydown={getList} class="btn btn-primary m-auto">
					Refresh List
				</button>
			</div>
			{#if !!leaderboard}
			<div class="px-20 portrait:px-0">
				<table class="table table-striped table-bordered p-4">
					<thead>
						<tr>
						<th>Place</th>
						<th>{name} UserID</th>
						<th>Insults Seen</th>
						</tr>
					</thead>
					<tbody>
						{#each leaderboard as entry, index}
						<tr>
							<td>{index + 1}</td>
							<td><code>{entry.referrer}</code></td>
							<td>{entry.data}</td>
						</tr>
						{/each}
					</tbody>
				</table>
				<div class="flex content-center justify-center p-4">
					<BsButton
						icon="arrow-left"
						text="Go back home"
						type="success"
						href="index.html"
					/>
				</div>
			</div>
			{/if}
		{:else}
			<div class="m-auto p-8">
				<BsLoader type="primary" loadingTime={duration} />
			</div>
			{/if}
	</div>
</div>