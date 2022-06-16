<script lang="ts">
    import { insults } from '../typescript/insults';
    let result = insults[Math.floor(Math.random() * insults.length)]
    const randomize = () => {
        result = insults[Math.floor(Math.random() * insults.length)]
    }
</script>

<main>
    <img src="../img/dmv-logo.png" alt="large, red button" on:click={randomize} class="p-4">
    <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
    <p class="text-center font-primary">{result}</p>
</main>

<style>
    img {
        width: 325px;
        display: block;
        margin: auto;
    }
</style>