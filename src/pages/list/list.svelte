<script>
    import Title from '../../components/title.svelte';
import {insults} from 'demotivator'
    import { userInsults } from '../../typescript/insults';
    const allInsults = userInsults.concat(insults)
    import 'bootstrap/dist/css/bootstrap.css'
    import Auth from '../login/auth.svelte';
  import LoginFooter from '../../components/loginfooter.svelte';
</script>


<Auth
let:loggedIn
>
<div class="text-8xl p-4">
    <Title />
</div>
{#if loggedIn}
<h3 class="text-4xl p-4 text-center font-primary font-medium">
        All Insults
        <br />
    </h3>
    <div class="text-center">
    {#each allInsults as insult}
        <p class="font-primary text-3xl">
            {insult}
        </p>
        <br />
    {/each}
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
        Home
    </a>
</div>

      <LoginFooter />
</Auth>