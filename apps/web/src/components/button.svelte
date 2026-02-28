<script lang="ts">
	// Imports
	import logo from '../img/dmv-logo.png';
	import { darkMode } from '../utils/darkMode';
	import '../styles/scss/bootstrapRange.scss';

	// Firebase
	import { fade, scale } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import Icon from './icon.svelte';
	import { resolveEnabledPackKeys, settingsStore } from '../utils/userSettings';
	import { filterInsultsByMaxWords } from '../utils/insultLength';

/*

Randomizer

*/

let result = $state('');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let userResult = $state('');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let insultsShown = $state(0);

// Database optimization: cache and batch writes
let cachedInsultCount = $state(0);
let pendingWrites = $state(0);
const batchThreshold = 10; // Write to DB every 10 presses
const batchFlushTimeout = 10000; // Also flush every 10 seconds if there are pending writes

const insultPackCache = new Map<string, string[]>();
let deMotivatorModulePromise: Promise<typeof import('demotivator')> | null = null;

const getInsultsForPacks = async (selectedPacks: string[]) => {
	const cacheKey = [...selectedPacks].sort().join('|');
	const cachedInsults = insultPackCache.get(cacheKey);
	if (cachedInsults) {
		return cachedInsults;
	}
	if (!deMotivatorModulePromise) {
		deMotivatorModulePromise = import('demotivator');
	}
	const { DeMotivator } = await deMotivatorModulePromise;
	const deMotivator = new DeMotivator();
	const loadedInsults = deMotivator.createArray({
		packs: selectedPacks
	});
	insultPackCache.set(cacheKey, loadedInsults);
	return loadedInsults;
};

// Initialize insult count from database on mount
const initializeInsultCount = async () => {
	const { readInsults } = await import('../typescript/readInsults');
	const loadedInsults = await readInsults();
	cachedInsultCount = loadedInsults + cachedInsultCount;
};

// Batch write pending insults to database
const flushPendingWrites = async () => {
	if (pendingWrites > 0) {
		const { updateInsultsSeen } = await import('../typescript/updateInsults');
		const success = await updateInsultsSeen(cachedInsultCount);
		if (success) {
			pendingWrites = 0;
		}
	}
};

// Note: beforeunload and onDestroy handlers use fire-and-forget async calls
// because browsers don't guarantee completion of async operations during these events.
// However, the batch threshold (every 10 presses) ensures regular persistence,
// minimizing potential data loss to at most 9 button presses in edge cases.

// Update randomize function to use checkbox states
const randomize = async () => {
	const { pickRandom } = await import('@demotivator/shared');
	const maxWordsLabel = $settingsStore.maxInsultWords <= 0 ? 'no word limit' : `${$settingsStore.maxInsultWords} words`;
	const selectedPacks = resolveEnabledPackKeys($settingsStore);
	const insults = await getInsultsForPacks(selectedPacks);
	const filteredInsults = filterInsultsByMaxWords(insults, $settingsStore.maxInsultWords);
	if (filteredInsults.length === 0) {
		const noMatchingInsultsMessage = `No insults found with ${maxWordsLabel}.`;
		result = noMatchingInsultsMessage;
		userResult = noMatchingInsultsMessage;
		return;
	}
	result = pickRandom(filteredInsults) || 'No insult found.';

	// Increment local counters
	insultsShown++;
	if (!MEGAMODE) {
		cachedInsultCount++;
		pendingWrites++;

		// Batch write to database every N presses
		if (pendingWrites >= batchThreshold) {
			await flushPendingWrites();
		}
	}
	try {
		const { updateDailyInsultStreak } = await import('../utils/insultStreak');
		await updateDailyInsultStreak();
	} catch (error) {
		console.error('Failed to update insult streak', error);
	}
};

const writeInsultToClipboard = async () => {
	const text = result || '';
	if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
		try {
			await navigator.clipboard.writeText(text);
			return;
		} catch (e) {
			console.warn('navigator.clipboard.writeText failed, falling back to Capacitor Clipboard', e);
		}
	}
};

/*

MEGAMODE

*/

let MEGAMODEresult = $state('');
let MEGAMODE = $state(false);
let MEGAMODEspeed = $state(250);
let MEGAMODEinsults = $state(0);

// Slider mapping: sliderValue is a "throttle" where right = fast.
const sliderMin = 1;
const sliderMax = 4680;
// initialize to match the default MEGAMODEspeed (250) without referencing it
let sliderValue = $state(sliderMax + sliderMin - 250);

let MEGAMODEinterval: ReturnType<typeof setInterval> | null = null;

const MEGAMODErandomize = async () => {
	const maxWordsLabel = $settingsStore.maxInsultWords <= 0 ? 'no word limit' : `${$settingsStore.maxInsultWords} words`;
	const selectedPacks = resolveEnabledPackKeys($settingsStore);
	const insults = await getInsultsForPacks(selectedPacks);
	const filteredInsults = filterInsultsByMaxWords(insults, $settingsStore.maxInsultWords);
	if (filteredInsults.length === 0) {
		MEGAMODEresult = `No insults found with ${maxWordsLabel}.`;
		return;
	}
	MEGAMODEresult = filteredInsults[Math.floor(Math.random() * filteredInsults.length)];
	MEGAMODEinsults++;
};

const startMEGAMODE = () => {
	stopMEGAMODE();
	const speed = Math.max(20, Number(MEGAMODEspeed) || 250);
	MEGAMODEinterval = setInterval(() => {
		MEGAMODErandomize();
	}, speed);
};

const stopMEGAMODE = () => {
	if (MEGAMODEinterval !== null) {
		clearInterval(MEGAMODEinterval as unknown as number);
		MEGAMODEinterval = null;
	}
};

const MEGAMODEspeedControl = () => {
	if (MEGAMODE) {
		startMEGAMODE();
	}
};

$effect(() => {
	// Map the slider throttle to interval milliseconds (inverted):
	// sliderValue == sliderMax  -> smallest interval (fastest)
	// sliderValue == sliderMin  -> largest interval (slowest)
	const v = Number(sliderValue) || sliderMax;
	MEGAMODEspeed = sliderMax + sliderMin - v;
});

$effect(() => {
	if (MEGAMODE) {
		MEGAMODErandomize();
		startMEGAMODE();
	} else {
		stopMEGAMODE();
	}
	return () => {
		stopMEGAMODE();
	};
});

// Responsive font sizing for insults: scale font down for long insults so they fit without scrolling.
let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;

const handleResize = () => {
	windowWidth = typeof window !== 'undefined' ? window.innerWidth : windowWidth;
};

onMount(() => {
	if (typeof window !== 'undefined') {
		window.addEventListener('resize', handleResize);
		// Use beforeunload to trigger flush immediately (fire-and-forget)
		window.addEventListener('beforeunload', () => {
			// Trigger flush immediately (browsers give limited time for async ops)
			flushPendingWrites();
		});
	}
	// Initialize insult count from database
	initializeInsultCount();
});

onDestroy(() => {
	if (typeof window !== 'undefined') {
		window.removeEventListener('resize', handleResize);
	}
	flushPendingWrites();
});

// On destroy doesn't work after navigation away, so also flush when the page is changed
// To combat this, it will flush every 15 seconds iff there are pending writes
let periodicFlushInterval: ReturnType<typeof setInterval> | null = null;
	const startPeriodicFlush = () => {
		if (typeof window === 'undefined') return;
		if (periodicFlushInterval !== null) return;
		periodicFlushInterval = setInterval(() => {
			if (pendingWrites > 0) {
				flushPendingWrites();
			}
		}, batchFlushTimeout);
	};
const stopPeriodicFlush = () => {
	if (periodicFlushInterval !== null) {
		clearInterval(periodicFlushInterval as unknown as number);
		periodicFlushInterval = null;
	}
};
// Start/stop the periodic flusher automatically based on pendingWrites
$effect(() => {
	if (pendingWrites > 0) {
		startPeriodicFlush();
	} else {
		stopPeriodicFlush();
	}
});
// Extra cleanup in case onDestroy wasn't reached elsewhere
onDestroy(() => {
	stopPeriodicFlush();
});

const calcFontSizeRem = (text: string | undefined) => {
	if (!text) return '1.4rem';
	const len = Math.max(1, text.trim().length);
	// Base sizes (rem) for short text by breakpoint
	const base = windowWidth >= 1280 ? 5.5 : windowWidth >= 768 ? 4.5 : 3.2;
	// Reduce size with length (non-linear) but clamp to reasonable bounds
	const scaleFactor = Math.pow(40 / Math.min(len, 400), 0.35);
	const size = base * scaleFactor;
	const clamped = Math.max(1.1, Math.min(base, size));
	return `${clamped.toFixed(3)}rem`;
};
let insultFontSize = $state('1.4rem');

$effect(() => {
	insultFontSize = calcFontSizeRem(result || MEGAMODEresult);
});

/*

End of Script

*/

</script>

<main class={`flex flex-col md:flex-row transition-all duration-500 ${result || MEGAMODEresult ? 'pt-6 md:pt-12' : 'pt-3'}`}>
	<!-- Left Panel - Button Section -->
	<div
		class={`flex items-center justify-center transition-all duration-500 ${
			result || MEGAMODEresult
				? 'w-full md:w-1/2 lg:w-2/5'
				: 'w-full'
		}`}
	>
		<div class="flex flex-col items-center gap-1 px-8 py-4">
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<img
				src={logo}
				draggable="false"
				alt="a large, red button"
				onclick={randomize}
				class="hover:cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 pb-4"
			>

			<!-- MEGAMODE Toggle -->
			<div class="form-check form-switch">
				<input
					type="checkbox"
					bind:checked={MEGAMODE}
					class="form-check-input"
					id="megamodeCheck"
					role="switch"
				>
				<label class="form-check-label" for="megamodeCheck">
					<b>MEGAMODE</b>
				</label>
			</div>

			<!-- Action Button -->
			<button
				disabled={MEGAMODE}
				onclick={writeInsultToClipboard}
				class={`btn ${!darkMode ? 'btn-primary' : 'btn-dark'} ${MEGAMODE ? 'disabled opacity-50' : ''}`}
			>
				<Icon name="clipboard" />
				Copy Insult to Clipboard
			</button>
		</div>
	</div>

	<!-- Right Panel - Insult Display (slides in from right on desktop/tablet) -->
	{#if result || MEGAMODEresult}
		<div
			class="flex-1 flex items-center justify-center p-8 border-t md:border-t-0 md:border-l-4 border-primary-majorelle-blue dark:border-primary-majorelle-blue"
			transition:fade={{ duration: 300 }}
		>
			{#if !MEGAMODE}
				{#if result}
					<div
						class="w-full max-w-4xl"
						transition:scale={{ duration: 400, start: 0.8 }}
					>
						<p class="font-primary text-center font-bold leading-tight px-4" style="font-size: {insultFontSize}; line-height: 1.02;">
							{result}
						</p>
					</div>
				{/if}
			{:else}
				<div class="w-full max-w-4xl flex flex-col items-center gap-8">
					<div class="min-h-50 flex items-center justify-center">
						<p class="font-primary text-center font-bold leading-tight px-4" style="font-size: {insultFontSize}; line-height: 1.02;">
							{MEGAMODEresult}
						</p>
					</div>

					<div class="w-full max-w-md">
						<p class="text-center font-primary text-lg font-semibold mb-4">
							Insults shown: <span class="text-primary-majorelle-blue dark:text-primary-majorelle-blue">{MEGAMODEinsults}</span>
						</p>

						<div class="d-flex align-items-center gap-3">
							<div class="flex-fill">
								<input
									type="range"
									class="form-range w-100"
									id="megamodeSpeedControl"
									min={sliderMin}
									max={sliderMax}
									onchange={MEGAMODEspeedControl}
									bind:value={sliderValue}
								/>
							</div>
							<p class="font-primary text-sm font-mono px-3 py-1 mb-0" style="min-width: 70px;">
								{MEGAMODEspeed}ms
							</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</main>
