<script>
    import '../app.css';
</script>

<main>
    <a href="https://porkyproductions.github.io/deMotivator"><img src="../../img/HedgehogIcon.png" alt="poorly drawn hedgehog" id="noHog" class="m-auto spin" /></a>
</main>

<style>
    .spin {
        animation: spin 2s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>