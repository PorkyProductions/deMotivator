<script lang="ts">
    import hedgehog from '../img/HedgehogIcon.png';
    import Title from './title.svelte';
    import { OS, deviceType } from '../utils/uaStub';
    import SiwGoogleButton from './siwGoogleButton.svelte';
    import { parentCompany } from '../typescript/constants';

    const year = new Date().getFullYear();

    const navigation = [
        { name: "(de)Motivator 1.0", href: "dmv1.html" },
        { name: "(de)Motivator.js", href: "https://github.com/PorkyProductions/deMotivator.js" },
        { name: "Leaderboard", href: "leaderboard.html" },
        { name: "Credits", href: "credits.html" },
        { name: "Share", href: "share.html" },
    ];

    // Logic: derived check for mobile/tablet to clean up the template
    const isMobileView = deviceType === 'mobile' || (deviceType === 'tablet' && (OS === 'Android' || OS === 'iOS'));
</script>

{#if isMobileView}
    <footer class="fixed bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-50 bg-primary-majorelle-blue">
        <a 
            href="login.html" 
            class="pointer-events-auto shadow-lg transform transition hover:scale-105 text-white dark:bg-secondary-orangePantone bg-primary-majorelleBlue font-primary font-bold py-3 px-8 rounded-full no-underline border-2 border-white/20 backdrop-blur-md"
        >
            View Account
        </a>
    </footer>

    <div class="h-24"></div>

{:else}
    <footer 
        class="fixed bottom-0 left-0 right-0 z-50 h-16 py-2 shadow-xl border-t border-white/10
        bg-primary-majorelle-blue dark:bg-gray-900/95 backdrop-blur-md portrait:hidden text-white"
    >
        <div class="container mx-auto px-6 h-full">
            <div class="flex justify-between items-center h-full">
                <!-- Left section: Hedgehog + Title + Copyright -->
                <div class="flex items-center gap-3">
                    <a href="https://porkyproductions.github.io" class="block">
                        <img src={hedgehog} alt="Hedgehog" class="w-10 h-10 hover:animate-spin object-contain" />
                    </a>
                    <div class="flex items-center gap-2 text-xs">
                        <Title />
                        <span class="opacity-60">| &copy; {year} {parentCompany}</span>
                    </div>
                </div>

                <!-- Center section: Navigation links -->
                <nav class="flex items-center gap-4">
                    {#each navigation as link}
                        <a class="text-xs hover:text-secondary-orangePantone transition-colors" href={link.href}>
                            {link.name}
                        </a>
                    {/each}
                </nav>

                <!-- Right section: Sign in button -->
                <div class="flex items-center">
                    <SiwGoogleButton />
                </div>
            </div>
        </div>
    </footer>
    
    <div class="h-16"></div>
{/if}