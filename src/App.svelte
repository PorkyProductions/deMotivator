<script>
    import './app.css'
    import Button from './components/button.svelte';
import Footer from './components/footer.svelte';
    import Title from './components/title.svelte';
</script>

<main>
    <div class="dark:bg-black dark:text-white" id="app">
        <Title />
        <Button />
        <div class="sm:p-3 md:p-4 lg:p-5 xl:p-20">

        </div>
        <div id="footer" class="" >
            <Footer />
        </div>
    </div>
</main>
