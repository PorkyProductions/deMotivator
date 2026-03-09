<script lang="ts">
import { Icon } from '@demotivator/ui';

interface ButtonControlsProps {
logo: string;
hasResult: boolean;
megaMode: boolean;
darkMode: boolean;
onRandomize: () => void | Promise<void>;
onCopyInsult: () => void | Promise<void>;
onMegaModeChange: (event: Event) => void;
}

const {
	logo,
	hasResult,
	megaMode,
	darkMode,
	onRandomize,
	onCopyInsult,
	onMegaModeChange
}: ButtonControlsProps = $props();
</script>

<div
class={`flex items-center justify-center transition-all duration-500 ${
	hasResult
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
onclick={onRandomize}
class="hover:cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 pb-4"
>

<div class="form-check form-switch">
<input
type="checkbox"
checked={megaMode}
onchange={onMegaModeChange}
class="form-check-input"
id="megamodeCheck"
role="switch"
>
<label class="form-check-label" for="megamodeCheck">
<b>MEGAMODE</b>
</label>
</div>

<button
disabled={megaMode}
onclick={onCopyInsult}
class={`btn ${!darkMode ? 'btn-primary' : 'btn-dark'} ${megaMode ? 'disabled opacity-50' : ''}`}
>
<Icon name="clipboard" />
Copy Insult to Clipboard
</button>
</div>
</div>
