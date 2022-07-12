<script>
    import './app.css'
    import './cursor.css'
    import Button from './components/button.svelte';
    import Footer from './components/footer.svelte';
    import Title from './components/title.svelte';
    import { Wave } from 'svelte-loading-spinners';
    import { onMount } from 'svelte';
    import '@capacitor/core'
import SignIn from './components/signIn.svelte';

    let ready = false;
    onMount(() => ready = true);
</script>

<main>
    {#if ready}
    <div class="dark:bg-black dark:text-white" id="app">
        <Title />
        <Button />
        <SignIn />
        <div class="sm:p-3 md:p-4 lg:p-5 xl:p-20">
            
        </div>
        <div id="footer" class="" >
            <Footer />
        </div>
    </div>
    {/if}
    {#if ready === false}
    <div class="m-auto">
        <Wave size="160" color="#4f46e5" unit="px" duration="1s"/>
    </div>
    {/if}
</main>
