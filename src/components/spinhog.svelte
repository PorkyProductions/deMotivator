<script>
    import '../app.css'
    import hedgehog from  '../img/HedgehogIcon.png';
</script>

<div class="flex justify-center dark:bg-black">
        <img src={hedgehog} alt="hedgehog" class="hedgehog-spin spin">
        <img src={hedgehog} alt="hedgehog" class="hedgehog-spin spin2">
        <img src={hedgehog} alt="hedgehog" class="hedgehog-spin spin3">
        <img src={hedgehog} alt="hedgehog" class="hedgehog-spin spin4">
        <img src={hedgehog} alt="hedgehog" class="hedgehog-spin spin5">
</div>

<style>
    .hedgehog-spin {
        position: absolute;
    }
    .spin {
        animation: spin 1.3s infinite;
        animation-delay: 0ms;
        margin: auto;
        padding-bottom: 400px;
    }
    .spin2 {
        animation: spin 1.3s infinite;
        animation-delay: 200ms;
        margin: auto;
        padding-bottom: 400px;
    }
    .spin3 {
        animation: spin 1.3s infinite;
        animation-delay: 400ms;
        margin: auto;
        padding-bottom: 400px;
    }
    .spin4 {
        animation: spin 1.3s infinite;
        animation-delay: 600ms;
        margin: auto;
        padding-bottom: 400px;
    }
    .spin5 {
        animation: spin 1.3s infinite;
        animation-delay: 800ms;
        margin: auto;
        padding-bottom: 400px;
    }
    @keyframes spin {
        0% {
            transform:rotate(0)
        }
        to {
            transform:rotate(360deg)
        }
    }
</style>

    
