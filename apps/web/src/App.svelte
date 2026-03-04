<script lang="ts">
	import Button from './components/button.svelte';
	import Footer from './components/footer.svelte';
	import Title from './components/title.svelte';
	import Loader from './components/loader.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { analytics } from './utils/firebase';
	import { print } from '@porkyproductions/hat/print';
	import { bsTheme } from './utils/darkMode';
	import HomeScreenDevWarningBanner from './components/homeScreenDevWarningBanner.svelte';
	import { initSettingsListener } from './utils/userSettings';
	import { initAdminAccessListener } from './utils/adminAccess';

	let ready = $state(false);

	onMount(() => {
		initSettingsListener();
		initAdminAccessListener();
		ready = true;
	});

	// FROM BEYOND THIS POINT IS FIREBASE LOGIC
	// BEWARE

	// Firebase is initialized in utils/firebase.ts
	print(analytics);

</script>
<div id="root" data-bs-theme={bsTheme}>
	{#if !ready}
		<div transition:fade>
			<Loader />
		</div>
	{:else}
		<div transition:fade>
			<div class="dark:bg-theme-black dark:text-white" id="app">
				{#if window.location.hostname === 'localhost' || window.location.hostname === 'demotivator-dev.web.app'}
					<div class="p-4">
						<HomeScreenDevWarningBanner />
					</div>
				{/if}
				<div class="text-md lg:text-4xl p-4">
					<Title />
				</div>
				<Button />
			<div class="sm:p-3 md:p-4 lg:p-5 xl:p-20"></div>
				<div id="footer" class="" >
					<Footer />
				</div>
			</div>
		</div>
	{/if}
</div>
