<script lang="ts">
    var year = new Date();
    import hedgehog from '../img/HedgehogIcon.png'
    import Title from './title.svelte';
    import { OS } from 'uadetect/dist/operatingSystem'
    import { deviceType } from 'uadetect/dist/deviceType';
    import SiwGoogleButton from './siwGoogleButton.svelte';
    import { parentCompany } from '../typescript/constants';
    const navigation = [
        {
            name: "(de)Motivator 1.0",
            href: "dmv1.html"
        },
        {
            name: "(de)Motivator.js",
            href: "https://github.com/PorkyProductions/deMotivator.js"
        },
        {
            name: "Leaderboard",
            href: "leaderboard.html"
        },
        {
            name: "Credits",
            href: "credits.html"
        },
        {
            name: "Share",
            href: "share.html"
        },
    ]
    let grown = true;
    let shrunk = false
    const shrinkAndGrow = () => {
        grown = !grown
        shrunk = !shrunk
    }
</script>



<!--
    First we check if it's mobile, which is the catch-all solution
    Then, we need to account for tablets. However, UADetect sometimes counts laptops as tablets, so we need to ensure the OS
    This is done by checking the OS, and if the OS is a tablet OS AND the deviceType is tablet, then we can paint the appropriate UI
-->


{#if deviceType === 'mobile'}
<!--Deadspace to cover entire screen on mobile devices-->
<div class="pb-96 flex content-center justify-center text-center">
    <footer class="footer pt-20">
        <a href="login.html" class="text-white dark:bg-secondary-orangePantone bg-primary-majorelleBlue font-primary underline py-2 px-4 rounded-full">
            View Account
        </a>
    </footer>
</div>

<!--If it's an Android Tablet-->
{:else if OS === 'Android' && deviceType === "tablet"}
    <div class="pb-96 flex content-center justify-center text-center">
            <div class="pb-28">
            </div>
            <footer class="footer pt-20">
                <a href="login.html" class="text-white dark:bg-secondary-orangePantone bg-primary-majorelleBlue font-primary underline py-2 px-4 rounded-full">
                    View Account
                </a>
            </footer>
    </div>
    
<!--If it's an iPad-->
{:else if OS === 'iOS' && deviceType === 'tablet'}
<div class="pb-96 flex content-center justify-center text-center">
    <div class="pb-28">
    </div>
    <footer class="footer pt-20">
        <a href="login.html" class="text-white dark:bg-secondary-orangePantone bg-primary-majorelleBlue font-primary underline py-2 px-4 rounded-full">
            View Account
        </a>
  </footer>
</div>

<!--Desktop-->
{:else}
    {#if shrunk}
        <footer class="bg-primary-majorelleBlue dark:bg-gray-900 portrait:hidden pb-0">
            <div class="flex content-center justify-center text-white">
                <Title />
            </div>
            <div class="flex content-center justify-center">
                <p class="text-white">Copyright &copy; 2020-{year.getFullYear()}, {parentCompany} and/or it's contributors. All Rights Reserved</p>
            </div>
            <div class="flex content-center justify-center">
                {#each navigation as link}
                    <a class="footer-link" href={link.href}>{link.name}</a> &nbsp;
                {/each}
            </div>
        </footer>
    {:else if grown}
        <footer class=" bg-primary-majorelleBlue dark:bg-gray-900 portrait:hidden rounded-t-md transition-all">
            <div class="flex justify-between content-center">
                <div class="flex justify-between flex-col">
                    <div class="flex content-center mb-0">
                        <a href="https://porkyproductions.github.io"><img src={hedgehog} alt="Hedgehog" id="logo" class="hover:animate-spin p-0 m-0"></a>
                        <div class="text-white">
                            <Title />
                        </div>
                        <div class="pt-6">
                            <SiwGoogleButton />
                        </div>
                        <div class="pt-6">
                            <button class="btn" on:click={shrinkAndGrow}>
                                {#if shrunk}
                                    Grow Navigation
                                {:else if grown}
                                    Shrink Navigation
                                {/if}
                            </button>
                        </div>
                    </div>
                    <hr />
                    <p class="text-white p-4">Copyright &copy; 2020-{year.getFullYear()}, {parentCompany} and/or it's contributors. All Rights Reserved</p>
                </div>   
                    <nav class="flex justify-between flex-col p-4 text-white underline font-primary font-medium mb-0">
                        {#each navigation as link}
                            <a class="footer-link" href={link.href}>{link.name}</a>
                        {/each}
                    </nav>
            </div>
        </footer>
    {/if}
{/if}

<style lang="scss">
    #logo {
        width: 7rem;
        padding: 1rem;
    }
    a {
        color: white;
        text-decoration: underline dashed;
    }
    hr {
        border: 1px solid #DABFFF;
        padding-left: 1rem;
    }

    @media (prefers-color-scheme: dark) {
        hr {
            border: 1px solid #F75C03;
            color: #F75C03;
        }
    } 
    * {
        margin-bottom: 0;
    }

</style>
