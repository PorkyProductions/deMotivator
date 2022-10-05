<script>
    var year = new Date();
    import hedgehog from '../img/HedgehogIcon.png'
    import Title from './title.svelte';
    import { deviceType, OS } from 'uadetect'
  import SiwGoogleButton from './siwGoogleButton.svelte';
</script>



<!--
    First we chefck if it's mobile, which is the catch-all solution
    Then, we need to account for tablets. However, UADetect sometimes counts laptops as tablets, so we need to ensure the OS
    This is done by checking the OS, and if the OS is a tablet OS AND the deviceType is tablet, then we can paint the appropriate UI
-->


{#if deviceType === 'mobile'}
<!--Deadspace to cover entire screen on mobile devices-->
<div class="pb-96 flex content-center justify-center text-center">
    <div class="pb-24">
    </div>
    <a href="/login.html" class="bg-primary-majorelleBlue dark:bg-secondary-orangePantone text-white font-primary font-medium p-5 rounded-lg">View Account</a>
</div>

<!--If it's an Android Tablet-->
{:else if OS === 'Android' && deviceType === "tablet"}
    <div class="pb-96 flex content-center justify-center text-center">
            <div class="pb-24">
            </div>
            <a href="/login.html" class="bg-primary-majorelleBlue dark:bg-secondary-orangePantone text-white font-primary font-medium p-5 rounded-lg">View Account</a>
    </div>
    
<!--If it's an iPad-->
{:else if OS === 'iOS' && deviceType === 'tablet'}
<div class="pb-96 flex content-center justify-center text-center">
    <div class="pb-24">
    </div>
    <a href="/login.html" class="bg-primary-majorelleBlue dark:bg-secondary-orangePantone text-white font-primary font-medium p-5 rounded-lg">View Account</a>
</div>

<!--Desktop-->
{:else}
<footer class=" bg-primary-majorelleBlue dark:bg-gray-600 portrait:hidden">
    <div class="flex justify-between content-center">
        <div class="flex justify-between flex-col">
            <div class="flex content-center">
                <img src={hedgehog} alt="Hedgehog" id="logo" class="dark:portrait:hidden dark:landscape:hover:open:default:hidden">
                <div class="text-white">
                    <Title />
                </div>
            </div>
            <hr />
            <p class="text-white p-4">Copyright &copy; {year.getFullYear()}, PorkyProductions and/or it's contributors. All Rights Reserved</p>
        </div>
        <div class="flex justify-between flex-col p-4 text-white underline">
            <a class="footer-link" href="index.html">Home</a>
            <a class="footer-link" href="https://porkyproductions.github.io/">PorkyProductions</a>
            <a class="footer-link" href="dmv1.html">(de)Motivator 1.0</a>
            <a class="footer-link" href="https://github.com/PorkyProductions/deMotivator.js">(de)Motivator.js</a>
            <SiwGoogleButton />
        </div>
    </div>
</footer>
{/if}

<style>
    #logo {
        width: 7rem;
        padding: 1rem;
    }
    a {
        color: white;
        text-decoration: underline dashed;
    }
    hr {
        border: 1px solid white;
        padding-left: 1rem;
    }
</style>