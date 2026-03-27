<script lang="ts">
import logo from '../img/dmv-logo.png';
import { darkMode } from '../utils/darkMode';
import '../styles/scss/bootstrapRange.scss';
import '../styles/scss/buttonsBootstrap.scss';
import { onDestroy, onMount } from 'svelte';
import { settingsStore } from '../utils/userSettings';
import { calcInsultFontSizeRem } from './button/calcInsultFontSize';
import ButtonControls from './button/buttonControls.svelte';
import ButtonDisplay from './button/buttonDisplay.svelte';
import { createMegamodeIntervalController } from './button/megamodeInterval';
import { getRandomInsultFromSettings } from './button/randomInsult';
import { transformInsultText } from '../utils/insultTransform';

let result = $state('');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let userResult = $state('');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let insultsShown = $state(0);
let cachedInsultCount = $state(0);
let pendingWrites = $state(0);
const batchThreshold = 10;
const batchFlushTimeout = 10000;

const initializeInsultCount = async () => {
	const { readInsults } = await import('../typescript/readInsults');
	const loadedInsults = await readInsults();
	cachedInsultCount = loadedInsults + cachedInsultCount;
};

const flushPendingWrites = async () => {
	if (pendingWrites > 0) {
		const { updateInsultsSeen } = await import('../typescript/updateInsults');
		const success = await updateInsultsSeen(cachedInsultCount);
		if (success) {
			pendingWrites = 0;
		}
	}
};

const randomize = async () => {
	const maxWordsLabel = $settingsStore.maxInsultWords <= 0 ? 'no word limit' : `${$settingsStore.maxInsultWords} words`;
	const selectedInsult = await getRandomInsultFromSettings($settingsStore);
	if (!selectedInsult) {
		const noMatchingInsultsMessage = `No insults found with ${maxWordsLabel}.`;
		result = noMatchingInsultsMessage;
		userResult = noMatchingInsultsMessage;
		return;
	}
	result = await transformInsultText(selectedInsult, $settingsStore);
	insultsShown++;
	if (!MEGAMODE) {
		cachedInsultCount++;
		pendingWrites++;
		const {
			isInsultMilestoneCount,
			syncMilestoneAchievements
		} = await import('../utils/achievements');
		if (isInsultMilestoneCount(cachedInsultCount)) {
			await syncMilestoneAchievements(cachedInsultCount);
		}
		if (pendingWrites >= batchThreshold) {
			await flushPendingWrites();
		}
	}
	try {
		const { updateDailyInsultStreak } = await import('../utils/insultStreak');
		const streakCount = await updateDailyInsultStreak();
		const { isStreakMilestoneCount, syncStreakMilestoneAchievements } = await import('../utils/achievements');
		if (isStreakMilestoneCount(streakCount)) {
			await syncStreakMilestoneAchievements(streakCount);
		}
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

let MEGAMODEresult = $state('');
let MEGAMODE = $state(false);
let MEGAMODEspeed = $state(500);
let MEGAMODEinsults = $state(0);
const sliderMin = 1;
const sliderMax = 4680;
let sliderValue = $state(sliderMax + sliderMin - 250);

const MEGAMODErandomize = async () => {
	const maxWordsLabel = $settingsStore.maxInsultWords <= 0 ? 'no word limit' : `${$settingsStore.maxInsultWords} words`;
	const selectedInsult = await getRandomInsultFromSettings($settingsStore);
	if (!selectedInsult) {
		MEGAMODEresult = `No insults found with ${maxWordsLabel}.`;
		return;
	}
	MEGAMODEresult = await transformInsultText(selectedInsult, $settingsStore);
	MEGAMODEinsults++;
};

const megamodeIntervalController = createMegamodeIntervalController(() => MEGAMODEspeed, MEGAMODErandomize);

const MEGAMODEspeedControl = () => {
	if (MEGAMODE) {
		megamodeIntervalController.start();
	}
};

$effect(() => {
	const v = Number(sliderValue) || sliderMax;
	MEGAMODEspeed = sliderMax + sliderMin - v;
});

$effect(() => {
	if (MEGAMODE) {
		void MEGAMODErandomize();
		megamodeIntervalController.start();
	} else {
		megamodeIntervalController.stop();
	}
	return () => {
		megamodeIntervalController.stop();
	};
});

let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
const handleResize = () => {
	windowWidth = typeof window !== 'undefined' ? window.innerWidth : windowWidth;
};

onMount(() => {
	if (typeof window !== 'undefined') {
		window.addEventListener('resize', handleResize);
		window.addEventListener('beforeunload', () => {
			void flushPendingWrites();
		});
	}
	void initializeInsultCount();
});

onDestroy(() => {
	if (typeof window !== 'undefined') {
		window.removeEventListener('resize', handleResize);
	}
	void flushPendingWrites();
});

let periodicFlushInterval: ReturnType<typeof setInterval> | null = null;
const startPeriodicFlush = () => {
	if (typeof window === 'undefined' || periodicFlushInterval !== null) return;
	periodicFlushInterval = setInterval(() => {
		if (pendingWrites > 0) {
			void flushPendingWrites();
		}
	}, batchFlushTimeout);
};
const stopPeriodicFlush = () => {
	if (periodicFlushInterval !== null) {
		clearInterval(periodicFlushInterval as unknown as number);
		periodicFlushInterval = null;
	}
};

$effect(() => {
	if (pendingWrites > 0) {
		startPeriodicFlush();
	} else {
		stopPeriodicFlush();
	}
});

onDestroy(() => {
	stopPeriodicFlush();
	megamodeIntervalController.stop();
});

let insultFontSize = $state('1.4rem');
$effect(() => {
	insultFontSize = calcInsultFontSizeRem(result || MEGAMODEresult, windowWidth);
});

const handleMEGAMODEChange = (event: Event) => {
	const target = event.currentTarget as HTMLInputElement;
	MEGAMODE = target.checked;
};

const handleSliderInput = (event: Event) => {
	const target = event.currentTarget as HTMLInputElement;
	sliderValue = Number(target.value);
};
</script>

<main class={`flex flex-col md:flex-row transition-all duration-500 ${result || MEGAMODEresult ? 'pt-6 md:pt-12' : 'pt-3'}`}>
	<ButtonControls logo={logo} hasResult={Boolean(result || MEGAMODEresult)} megaMode={MEGAMODE} darkMode={darkMode} onRandomize={randomize} onCopyInsult={writeInsultToClipboard} onMegaModeChange={handleMEGAMODEChange} />
	<ButtonDisplay hasResult={Boolean(result || MEGAMODEresult)} result={result} megaModeResult={MEGAMODEresult} megaMode={MEGAMODE} insultFontSize={insultFontSize} megaModeInsults={MEGAMODEinsults} sliderMin={sliderMin} sliderMax={sliderMax} sliderValue={sliderValue} megaModeSpeed={MEGAMODEspeed} onSliderInput={handleSliderInput} onSpeedChange={MEGAMODEspeedControl} />
</main>
