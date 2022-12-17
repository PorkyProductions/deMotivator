<script lang="ts">
    // Imports
    import logo from '../img/dmv-logo.png';
    import { Insult, UserInsult } from '../typescript/insult'
    console.log({
        Insult,
        UserInsult
    })

    // Firebase
    import {fade} from 'svelte/transition'
    import Auth from '../pages/login/auth.svelte';

/*

Randomizer

*/

let insultsShown = 0
let result = ""
let userResult = ""
const randomize = async () => {
    const { userInsults } = await import('../typescript/insults')
    const { insults } = await import('demotivator')
    const demotivatorAndUserIsults = userInsults.concat(insults)
    userResult = demotivatorAndUserIsults[Math.floor(Math.random() * demotivatorAndUserIsults.length)]
    result = insults[Math.floor(Math.random() * insults.length)]
    insultsShown++
}
/*

MEGAMODE

*/

let MEGAMODEresult = ""
let MEGAMODE = false
let MEGAMODEspeed = 250
let MEGAMODEinsults = 0;

const MEGAMODErandomize = async () => {
    const { insults } = await import('demotivator')
    MEGAMODEresult = insults[Math.floor(Math.random() * insults.length)]
    MEGAMODEinsults++
}
const MEGAMODEspeedControl = () => {
    setInterval(() => {
        MEGAMODErandomize();
        console.log(MEGAMODEspeed);
    }, MEGAMODEspeed) 
}
</script>

<Auth
let:loggedIn
>

<main>
    <img src={logo} draggable="false" alt="a large, red button" on:click={randomize} class="p-4 hover:cursor-pointer">
    <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
    {#if !MEGAMODE}
        {#if loggedIn}
            <p class="text-center font-primary" transition:fade>{userResult}</p>
            <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
        {:else if !loggedIn}
            <p class="text-center font-primary" transition:fade>{result}</p>
            <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
        {/if}
    {:else if MEGAMODE}
        <p class="text-center font-primary">{MEGAMODEresult}</p>
        <br />
        <br />
        <p class="text-center font-primary">
            Insults shown: {MEGAMODEinsults}
        </p>
        <div class="flex content-center justify-center">
            <label for="">
                <input type="range" name="" id="" min="1" max="2000" on:change={MEGAMODEspeedControl} bind:value={MEGAMODEspeed} />
            </label>
            <p>{MEGAMODEspeed}</p>
        </div>
        <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
    {/if}
    <div class="flex content-center justify-center">
        <label class="hover:font-black hover:text-red-600 font-primary">
            <input type=checkbox bind:checked={MEGAMODE} class="">
            MEGAMODE
        </label>
    </div>
    
</main>

</Auth>

<style>
    img {
        width: 325px;
        display: block;
        margin: auto;
    }
</style>