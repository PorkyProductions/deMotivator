<script lang="ts">
	import HeroSection from './components/heroSection.svelte';
	import InitialState from './components/initialState.svelte';
	import StoryMode from './components/storyMode.svelte';
	import NavigationLinks from './components/navigationLinks.svelte';
	import { bsTheme } from '../../utils/darkMode';
	import confetti from 'canvas-confetti';
	import { errorMessages, storyLines } from './utils/staticContent';

	const lines = storyLines;

	// State management
	let currentLineIndex = $state(0);
	let showStarted = $state(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let linkVisible = $state(false);
	let storyComplete = $state(false);
	let userInteracted = $state(false);
	const messageSpeed = $state(2500);
	let paused = $state(false);
	let autoplayInterval: number | undefined;

	// Computed values
	const currentLine = $derived(lines[currentLineIndex] || '');
	const progress = $derived(((currentLineIndex + 1) / lines.length) * 100);
	const isEmoticon = $derived(currentLine.includes('🤯') || currentLine.includes('💔'));
	const isAction = $derived(currentLine.startsWith('*') && currentLine.endsWith('*'));

	// Story controls
	const startStory = () => {
		showStarted = true;
		userInteracted = true;
		autoplayInterval = setInterval(nextLine, messageSpeed);

		// Small confetti for starting
		confetti({
			particleCount: 9999,
			spread: 360,
			colors: ['#4f46e5', '#F75C03', '#DABFFF', '#db0000', '#ff7b00', '#ffbb00', '#00ff22', '#046d00', '#00fffb', '#001eff', '#6f00ff', '#36008c', '#ff00d4', '#0000F4']
		});
	};

	const nextLine = () => {
		if (!paused && currentLineIndex < lines.length - 1) {
			currentLineIndex++;

			// Check for special moments
			if (currentLine === 'YAY!') {
				confetti({
					particleCount: 99999,
					spread: 360,
					colors: ['#4f46e5', '#F75C03', '#DABFFF', '#db0000', '#ff7b00', '#ffbb00', '#00ff22', '#046d00', '#00fffb', '#001eff', '#6f00ff', '#36008c', '#ff00d4', '#0000F4']
				});
			}

			if (currentLineIndex === lines.length - 1) {
				storyComplete = true;
				linkVisible = true;
				clearInterval(autoplayInterval);
			}
		}
	};

	const previousLine = () => {
		if (currentLineIndex > 0) {
			currentLineIndex--;
		}
	};

	const togglePause = () => {
		paused = !paused;
	};

	const restartStory = () => {
		currentLineIndex = 0;
		storyComplete = false;
		linkVisible = false;
		paused = false;
		clearInterval(autoplayInterval);
		autoplayInterval = setInterval(nextLine, messageSpeed);
	};

	const skipToEnd = () => {
		currentLineIndex = lines.length - 1;
		storyComplete = true;
		linkVisible = true;
		clearInterval(autoplayInterval);
	};

	// Cleanup
	$effect(() => {
		return () => {
			if (autoplayInterval) clearInterval(autoplayInterval);
		};
	});

	const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen dark:bg-theme-black">
	<HeroSection />

	<!-- Main Content -->
	<div class="container py-5">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-xl-6">
				{#if !showStarted}
					<InitialState bind:showStarted {randomErrorMessage} {startStory} />
				{:else}
					<StoryMode
						{progress}
						{isEmoticon}
						{isAction}
						{currentLine}
						{currentLineIndex}
						linesLength={lines.length}
						{paused}
						{storyComplete}
						{previousLine}
						{nextLine}
						{togglePause}
						{restartStory}
						{skipToEnd}
					/>
				{/if}

				<!-- Navigation Options (Always visible) -->
				{#if !userInteracted || storyComplete}
					<NavigationLinks />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	:global(body), :global(html) {
		height: 100%;
		margin: 0;
	}

	/* Smooth animations */
	:global(.progress-bar) {
		transition: width 0.5s ease;
	}

	/* Large switch styling */
	:global(.form-switch .form-check-input:checked) {
		background-color: #4f46e5;
		border-color: #4f46e5;
	}

	/* Glowing effect for mystery switch */
	:global(.form-check-input:hover) {
		box-shadow: 0 0 20px rgba(79, 70, 229, 0.5);
	}

	/* Text animations */
	@keyframes pulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.05); }
	}

	:global(.display-3) {
		animation: pulse 2s infinite;
	}
</style>
