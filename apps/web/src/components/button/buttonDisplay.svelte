<script lang="ts">
import { fade, scale } from 'svelte/transition';

interface ButtonDisplayProps {
hasResult: boolean;
result: string;
megaModeResult: string;
megaMode: boolean;
insultFontSize: string;
megaModeInsults: number;
sliderMin: number;
sliderMax: number;
sliderValue: number;
megaModeSpeed: number;
onSliderInput: (event: Event) => void;
onSpeedChange: () => void;
}

const {
	hasResult,
	result,
	megaModeResult,
	megaMode,
	insultFontSize,
	megaModeInsults,
	sliderMin,
	sliderMax,
	sliderValue,
	megaModeSpeed,
	onSliderInput,
	onSpeedChange
}: ButtonDisplayProps = $props();
</script>

{#if hasResult}
<div
class="flex-1 flex items-center justify-center p-8 border-t md:border-t-0 md:border-l-4 border-primary-majorelle-blue dark:border-primary-majorelle-blue"
transition:fade={{ duration: 300 }}
>
{#if !megaMode}
{#if result}
<div class="w-full max-w-4xl" transition:scale={{ duration: 400, start: 0.8 }}>
<p class="font-primary text-center font-bold leading-tight px-4" style="font-size: {insultFontSize}; line-height: 1.02;">
{result}
</p>
</div>
{/if}
{:else}
<div class="w-full max-w-4xl flex flex-col items-center gap-8">
<div class="min-h-50 flex items-center justify-center">
<p class="font-primary text-center font-bold leading-tight px-4" style="font-size: {insultFontSize}; line-height: 1.02;">
{megaModeResult}
</p>
</div>

<div class="w-full max-w-md">
<p class="text-center font-primary text-lg font-semibold mb-4">
Insults shown: <span class="text-primary-majorelle-blue dark:text-primary-majorelle-blue">{megaModeInsults}</span>
</p>

<div class="d-flex align-items-center gap-3">
<div class="flex-fill">
<input
type="range"
class="form-range w-100"
id="megamodeSpeedControl"
min={sliderMin}
max={sliderMax}
value={sliderValue}
oninput={onSliderInput}
onchange={onSpeedChange}
/>
</div>
<p class="font-primary text-sm font-mono px-3 py-1 mb-0" style="min-width: 70px;">
{megaModeSpeed}ms
</p>
</div>
</div>
</div>
{/if}
</div>
{/if}
