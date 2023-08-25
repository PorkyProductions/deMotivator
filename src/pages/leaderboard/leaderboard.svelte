<script lang="ts">
	import {leaderboard} from '../../typescript/readInsults'
	import { getListOfAllUsersWhoHaveSeenInsults as getList } from '../../typescript/readInsults'
	import { afterUpdate } from 'svelte';
	import {randomInRange} from '@porkyproductions/hat/randomInRange'
	import { fade } from 'svelte/transition';
	import { name } from '../../typescript/constants';
	import { bsTheme } from '../../utils/darkMode';
	import { BsModalProps } from '../../typescript/types';


	import Title from '../../components/title.svelte'
	import BsButton from '../../components/bsButton.svelte';
	import BsLoader from '../../components/bsLoader.svelte';
	import Icon from '../../components/icon.svelte';
	import BsSpinner from '../../components/bs-spinner.svelte';
	import BsModal from '../../components/bs-modal.svelte';
	
	const modalProps: BsModalProps = {
		icon: "patch-question",
		preButtonIcon: "patch-question",
		preButtonText: "How do I check my (de)Motivator UserID",
		preButtonType: "secondary",
		title: "What is a (de)Motivator UserID",
		body: "A (de)Motivator UserID is like a unique identifier for your account. Once you create a (de)Motivator account, PorkyProductions will randomly generate a series of characters that is uniquely tied to your account. You can check what your (de)Motivator UserID is on the account page",
		closeButtonText: "Close",
		closeButtonType: "secondary",
		confirmButtonAction: () => window.location.href = "/login.html",
		confirmButtonText: "Go to the accounts page",
		confirmButtonType: "info",
	}



	// Loader Logic
	let ready = false
	let duration = randomInRange(1, 3500);
	const load = async (d: number = duration) => {
		const { SplashScreen } = await import("@capacitor/splash-screen");
		await SplashScreen.show({
			showDuration: d,
			autoHide: true,
		});
		setTimeout(() => (ready = true), d);
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
					<Icon name="arrow-clockwise" /> Refresh List
				</button>
			</div>
			<div class="flex content-center justify-center p-4">
				<BsModal {...modalProps} />
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
						type="secondary"
						href="index.html"
					/>
				</div>
			</div>
			{/if}
		{:else}
			<div class="p-4">
				<BsSpinner type="primary" />
			</div>
			<div class="m-auto p-8">
				<BsLoader type="primary" loadingTime={duration} />
			</div>
		{/if}
	</div>
</div>