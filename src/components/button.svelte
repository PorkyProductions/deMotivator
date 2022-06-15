<script lang="ts">
    import { insults } from '../typescript/insults';
    let result = insults[Math.floor(Math.random() * insults.length)]
    const randomize = () => {
        result = insults[Math.floor(Math.random() * insults.length)]
    }
</script>

<main>
    <img src="../img/dmv-logo.png" alt="large, red button" on:click={randomize} class="p-4">
    <p class="text-center font-primary">{result}</p>
</main>

<style>
    img {
        width: 325px;
        display: block;
        margin: auto;
    }
</style>