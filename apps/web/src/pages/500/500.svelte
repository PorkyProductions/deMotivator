<script>
	import Spinhog from '../../components/spinhog.svelte';
	import Title from '../../components/title.svelte';
	import { Icon } from '@demotivator/ui-components';
	let countdown = 15;
	const countdownTimer = setInterval(() => {
		countdown--;
		if (countdown === 0) {
			clearInterval(countdownTimer);
			window.location.href='index.html';
		}
	},
	1000
	);
</script>

<main>
	<div class=" dark:bg-black dark:text-white hover:text-purple-500 dark:hover:text-white rounded-xl sm:pb-72 lg:pb-80 xl:pb-96" style="font-family: 'Raleway', sans-serif;">
		<Title />
		<h1 class="text-center font-primary font-bold text-9xl hover:animate-spin">
			500
		</h1>
		<h2 class="text-center font-primary font-bold text-8xl">
			Internal Server Error 💔
		</h2>
		<h3 class="text-center font-primary font-bold text-7xl">
			You will be automatically redirected in {countdown} seconds
		</h3>
		<Spinhog />
	</div>
	<div class="container text-center mt-5 pb-5">
				<a href="/" class="btn btn-outline-secondary btn-lg">
					<Icon name="house-door" /> Back to Home
				</a>
	</div>
</main>
