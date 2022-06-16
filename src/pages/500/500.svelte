<script>
    import Spinhog from '../../components/spinhog.svelte';
    import '../../app.css'
    import Title from '../../components/title.svelte';
</script>

<main>
    <div class="bg-indigo-700 dark:bg-black text-white rounded-xl lg:pb-48 sm:pb-32 xl:pb-64" style="font-family: 'Raleway', sans-serif;">
        <Title />
        <h1 class="text-center text-9xl p-4">
            500
        </h1>
        <h1 class="text-center text-3xl p-4">
            Interal Server Error
        </h1>
        <h1 class="text-center text-3xl p-4">
            <a href="https://porkyproductions.github.io/deMotivator" class= "hover:rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-500 hover:p-4 dark:hover:from-green-500 dark:hover:to-purple-500">Click here to go home</a>
        </h1>
        <Spinhog />
</main>