<script lang="ts">
    // Imports
    import logo from '../img/dmv-logo.png';
    import { darkMode } from '../utils/darkMode'
    import '../styles/scss/buttonsBootstrap.scss';
    import '../styles/scss/bootstrapRange.scss'

    // Firebase
    import {fade, scale} from 'svelte/transition'
    import { onMount, onDestroy } from 'svelte';
    import Icon from './icon.svelte';

/*

Randomizer

*/

let insultsShown = $state(0);
let result = $state("");
let userResult = $state("");
const randomize = async () => {
    const { userInsults } = await import('../typescript/insults')
    const { insults } = await import('demotivator/dist/insults')
    let { readInsults } = await import('../typescript/readInsults')
    const {updateInsultsSeen} = await import('../typescript/updateInsults')
    const demotivatorAndUserIsults = userInsults.concat(insults)
    userResult = demotivatorAndUserIsults[Math.floor(Math.random() * demotivatorAndUserIsults.length)]
    result = insults[Math.floor(Math.random() * insults.length)]
    let insultsSeenDB: number;
    insultsShown++
    insultsSeenDB = await readInsults()
    if (!MEGAMODE) {
        updateInsultsSeen(insultsSeenDB + 1)
    }
}

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

let MEGAMODEresult = $state("");
let MEGAMODE = $state(false);
let MEGAMODEspeed = $state(250);
let MEGAMODEinsults = $state(0);

let MEGAMODEinterval: ReturnType<typeof setInterval> | null = null;

const MEGAMODErandomize = async () => {
    const { insults } = await import('demotivator/dist/insults');
    MEGAMODEresult = insults[Math.floor(Math.random() * insults.length)];
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
    }
});

onDestroy(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
    }
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
            <img 
                src={logo} 
                draggable="false" 
                alt="a large, red button" 
                onclick={randomize} 
                onkeypress={randomize} 
                class="hover:cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 pb-4"
            >
            
            <!-- MEGAMODE Toggle -->
            <div class="form-check">
                <input 
                    type="checkbox" 
                    bind:checked={MEGAMODE} 
                    class="form-check-input" 
                    id="megamodeCheck"
                >
                <label class="form-check-label" for="megamodeCheck">
                    MEGAMODE
                </label>
            </div>

            <!-- Action Button -->
            <button 
                disabled={MEGAMODE} 
                onclick={writeInsultToClipboard} 
                class={`btn ${!darkMode ? "btn-primary" : "btn-dark"} ${MEGAMODE ? 'disabled opacity-50' : ''}`}
            >
                <Icon name="clipboard" /> 
                Copy insult to clipboard
            </button>
        </div>
    </div>

    <!-- Right Panel - Insult Display (slides in from right on desktop/tablet) -->
    {#if result || MEGAMODEresult}
        <div 
            class="flex-1 flex items-center justify-center p-8 border-t md:border-t-0 md:border-l-4 border-primary-majorelle-blue dark:border-secondary-orange-pantone"
            transition:fade={{duration: 300}}
        >
            {#if !MEGAMODE}
                {#if result}
                    <div 
                        class="w-full max-w-4xl"
                        transition:scale={{duration: 400, start: 0.8}}
                    >
                        <p class="font-primary text-center font-bold leading-tight px-4" style="font-size: {insultFontSize}; line-height: 1.02;">
                            {result}
                        </p>
                    </div>
                {/if}
            {:else}
                <div class="w-full max-w-4xl flex flex-col items-center gap-8">
                    <div class="min-h-[200px] flex items-center justify-center">
                        <p class="font-primary text-center font-bold leading-tight px-4" style="font-size: {insultFontSize}; line-height: 1.02;">
                            {MEGAMODEresult}
                        </p>
                    </div>
                    
                    <div class="w-full max-w-md">
                        <p class="text-center font-primary text-lg font-semibold mb-4">
                            Insults shown: <span class="text-primary-majorelle-blue dark:text-secondary-orange-pantone">{MEGAMODEinsults}</span>
                        </p>
                        
                        <div class="d-flex align-items-center gap-3">
                            <div class="flex-fill">
                                <input 
                                    type="range" 
                                    class="form-range w-100" 
                                    id="megamodeSpeedControl"
                                    min="1" 
                                    max="2000" 
                                    onchange={MEGAMODEspeedControl} 
                                    bind:value={MEGAMODEspeed} 
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