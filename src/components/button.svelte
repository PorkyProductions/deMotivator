<script lang="ts">
    // Imports
    import logo from '../img/dmv-logo.png';
    import { Insult, UserInsult } from '../typescript/insult'
    import { darkMode } from '../utils/darkMode'
    import '../styles/scss/buttonsBootstrap.scss';
    import '../styles/scss/bootstrapRange.scss'
    console.log({
        Insult,
        UserInsult
    })

    // Firebase
    import {fade} from 'svelte/transition'
    import Icon from './icon.svelte';

/*

Randomizer

*/

let insultsShown = 0
let result = ""
let userResult = ""
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
    const { setClipboardText } = await import('uadetect/dist/clipboard')
    await setClipboardText(result || "")
}

/*

MEGAMODE

*/

let MEGAMODEresult = ""
let MEGAMODE = false
let MEGAMODEspeed = 250
let MEGAMODEinsults = 0;

const MEGAMODErandomize = async () => {
    const { insults } = await import('demotivator/dist/insults')
    MEGAMODEresult = insults[Math.floor(Math.random() * insults.length)]
    MEGAMODEinsults++
}
const MEGAMODEspeedControl = async () => {
    setInterval(() => {
        MEGAMODErandomize();
    }, MEGAMODEspeed) 
}



</script>

<main>
    <img src={logo} draggable="false" alt="a large, red button" on:click={randomize} on:keypress={randomize} class="p-4 hover:cursor-pointer">
    <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
    {#if !MEGAMODE}
            <p class="text-center font-primary" transition:fade>{result}</p>
            <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
    {:else if MEGAMODE}
        <p class="text-center font-primary">{MEGAMODEresult}</p>
        <br />
        <br />
        <p class="text-center font-primary">
            Insults shown: {MEGAMODEinsults}
        </p>
        <div class="flex content-center justify-center">
            <label for="megamodeSpeedControl">
                <input type="range" class="form-range"  name="megamodeSpeedControl" id="" min="1" max="2000" on:change={MEGAMODEspeedControl} bind:value={MEGAMODEspeed} />
            </label>
            <p>{MEGAMODEspeed}</p>
        </div>
        <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
    {/if}
    <div class="flex content-center justify-center transition-all pb-4">
        <label class="hover:font-black hover:text-red-600 font-primary">
            <input type=checkbox bind:checked={MEGAMODE} class="hover:checked:accent-blue-600">
            MEGAMODE
        </label>
    </div>
    {#if MEGAMODE}
        <div class="flex content-center justify-center transition-all">
            <button disabled={true} on:click={writeInsultToClipboard} class={!darkMode ? "btn btn-primary" : "btn btn-dark"}><Icon name="clipboard" /> Copy insult to clipboard</button>
        </div>
    {:else}
        <div class="flex content-center justify-center transition-all">
            <button disabled={false} on:click={writeInsultToClipboard} class={!darkMode ? "btn btn-primary" : "btn btn-dark"}><Icon name="clipboard" /> Copy insult to clipboard</button>
        </div>
    {/if}
    
    
</main>
