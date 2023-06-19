<script lang="ts">
    import Title from '../../components/title.svelte';
    import Icon from '../../components/icon.svelte';
    import shuffle from 'lodash/shuffle'
    import { insults, DeMotivator } from 'demotivator'
    import {print} from '../../utils/print'
    const dmv = new DeMotivator()
    print(dmv);
    const profaneArray = dmv.createArray({
        original: true,
        profane: true
    })
    import { userInsults } from '../../typescript/insults';
    let userWantsProfaneInsults: boolean = false
    const allInsults = shuffle(userInsults.concat(insults)); 
    const profaneInsults = shuffle(userInsults.concat(profaneArray))
    import Auth from '../login/auth.svelte';
    import LoginFooter from '../../components/loginFooter.svelte';
    import { bsTheme } from '../../utils/darkMode';
</script>

<div id="root" data-bs-theme={bsTheme}>
    <Auth
let:loggedIn
>
<div class="p-4 text-9xl">
    <Title />
</div>
{#if loggedIn}
<h3 class="text-4xl p-4 text-center font-primary font-normal">
        All Insults
    </h3>
    <div class="flex content-center justify-center p-4">
        <label class="hover:font-black hover:text-red-600 font-primary">
            <input type=checkbox bind:checked={userWantsProfaneInsults} class="hover:checked:accent-blue-600 dark:hover:checked:accent-theme-orange">
            Include Profanity
        </label>
    </div>
    <hr />
    <div class="text-center p-4">
        {#if !userWantsProfaneInsults}
            {#each allInsults as insult}
                <p class="font-primary font-light text-3xl">
                    {insult}
                </p>
                <br />
            {/each}
        {:else}
                {#each profaneInsults as pi}
                    <p class="font-primary font-light text-3xl">
                        {pi}
                    </p>
                    <br />
                {/each}
        {/if}
</div>
{:else}
<div class="bg-red-500 text-white">
    <h3 class="text-4xl p-4 text-center font-primary font-bold">
        You must be logged in to view all insults.
        <br />
    </h3>
    <div class="flex content-center justify-center p-4">
    <a href="login.html" class="btn btn-success">
        Login
    </a>
</div>
</div>
{/if}
<div class="flex content-center justify-center p-4">
    <a href="index.html" class="btn btn-primary">
       <Icon name="house-door" /> Home
    </a>
</div>

<LoginFooter />
</Auth>
</div>