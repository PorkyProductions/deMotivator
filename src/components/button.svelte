<script lang="ts">
    // Imports
    import logo from  '../img/dmv-logo.png';
    import { getAuth } from "firebase/auth";
    import { Insult, UserInsult } from '../typescript/insult'
    console.log({
        Insult,
        UserInsult
    })

    // Firebase
    const auth = getAuth();
    const user = auth.currentUser;
    import loggedIn from '../pages/login/auth.svelte'
    if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
}

/*

Randomizer

*/


let result = ""
const randomize = async () => {
    if (loggedIn) {
        const { userInsults } = await import('../typescript/insults')
        result = userInsults[Math.floor(Math.random() * userInsults.length)]
    } else if (!loggedIn) {
        const { insults } = await import('demotivator')
        result = insults[Math.floor(Math.random() * insults.length)]
    }
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
setInterval(()=>{clearInterval; setInterval(() => MEGAMODErandomize(), MEGAMODEspeed)}, 1000)
</script>

<main>
    <img src={logo} alt="a large, red button" on:click={randomize} class="p-4">
    <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
    {#if !MEGAMODE}
        <p class="text-center font-primary">{result}</p>
    {:else if MEGAMODE}
        <p class="text-center font-primary">{MEGAMODEresult}</p>
        <br />
        <br />
        <p class="text-center font-primary">
            Insults shown: {MEGAMODEinsults}
        </p>
        <div class="flex content-center justify-center">
            <label for="">
                <input type="range" name="" id="" min="1" max="2000" bind:value={MEGAMODEspeed} />
            </label>
            <p>{MEGAMODEspeed}</p>
        </div>
    {/if}
    <div class="flex content-center justify-center">
        <label class="hover:font-black hover:text-red-600 font-primary">
            <input type=checkbox bind:checked={MEGAMODE} class="">
            MEGAMODE
        </label>
    </div>
    
</main>

<style>
    img {
        width: 325px;
        display: block;
        margin: auto;
    }
</style>