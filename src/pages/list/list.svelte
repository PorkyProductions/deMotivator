<script>
    import Title from '../../components/title.svelte';
import {insults} from 'demotivator'
    import { userInsults } from '../../typescript/insults';
    const allInsults = userInsults.concat(insults)
    import 'bootstrap/dist/css/bootstrap.css'
</script>

<div class="text-8xl p-4">
    <Title />
    <h3 class="text-4xl p-4 text-center font-primary font-medium">
        All Insults
    </h3>
</div>

<div class="text-center">
    {#each allInsults as insult}
        <p class="font-primary text-3xl">
            {insult}
        </p>
        <br />
    {/each}
</div>
<div class="flex content-center justify-center p-4">
    <a href="index.html" class="btn btn-primary">
        Home
    </a>
</div>