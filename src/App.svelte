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
        <div id="footer" class="fixed bottom-0" >
            <Footer />
        </div>
    </div>
</main>
