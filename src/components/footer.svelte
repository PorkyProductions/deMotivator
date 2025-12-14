<script lang="ts">
    import hedgehog from '../img/HedgehogIcon.png';
    import Title from './title.svelte';
    import Icon from './icon.svelte';
    import { OS, deviceType } from '../utils/uaStub';
    import SiwGoogleButton from './siwGoogleButton.svelte';
    import { parentCompany } from '../typescript/constants';
    import { navigation } from '../utils/navigation';

    const year = new Date().getFullYear();

    // Logic: derived check for mobile/tablet to clean up the template
    const isMobileView = deviceType === 'mobile' || (deviceType === 'tablet' && (OS === 'Android' || OS === 'iOS'));
</script>

{#if isMobileView}
    <footer class="dmv-footer fixed bottom-0 left-0 right-0 z-50 bg-linear-to-r from-primary-majorelle-blue via-indigo-600 to-primary-majorelle-blue dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl border-t border-white/10 backdrop-blur-md">
        <div class="container mx-auto px-4 py-3">
            <div class="flex flex-col items-center gap-3">
                <!-- Mobile Navigation Row -->
                <nav class="flex items-center justify-center gap-4 flex-wrap">
                    {#each navigation as link}
                        <a 
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            class="flex items-center gap-1.5 text-white/80 hover:text-white transition-all duration-200 hover:scale-105 text-sm"
                        >
                            <Icon name={link.icon} />
                            <span>{link.name}</span>
                        </a>
                    {/each}
                </nav>
                <!-- Mobile Account Button -->
                <a 
                    href="login.html" 
                    class="btn btn-light"
                >
                    <Icon name="person-circle" />
                    <span>View Account</span>
                </a>
                <!-- Copyright -->
                <div class="text-xs text-white/60">
                    &copy; {year} {parentCompany}
                </div>
            </div>
        </div>
    </footer>

    <div class="h-36"></div>

{:else}
    <footer 
        class="dmv-footer fixed bottom-0 left-0 right-0 z-50 py-3 shadow-2xl border-t border-white/10
        bg-linear-to-r from-primary-majorelle-blue via-indigo-600 to-primary-majorelle-blue dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md portrait:hidden text-white"
    >
        <div class="container mx-auto px-6">
            <div class="flex justify-between items-center">
                <!-- Left section: Hedgehog + Title + Copyright -->
                <div class="flex items-center gap-4">
                    <a href="https://porkyproductions.github.io" class="block group">
                        <img src={hedgehog} alt="Hedgehog" class="w-11 h-11 group-hover:animate-spin object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                    </a>
                    <div class="flex flex-col leading-tight" >
                        <div class="flex items-center gap-2" id="logoText">
                            <Title />
                        </div>
                        <div class="text-xs text-white/60 mt-0.5 flex items-center gap-1">
                            <Icon name="c-circle" />
                            <span>{year} {parentCompany}</span>
                        </div>
                    </div>
                </div>

                <!-- Center section: Navigation links with icons -->
                <nav class="flex items-center gap-1">
                    {#each navigation as link, i}
                        <a 
                            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                        >
                            <Icon name={link.icon} />
                            <span>{link.name}</span>
                            {#if link.external}
                                <Icon name="box-arrow-up-right" />
                            {/if}
                        </a>
                        {#if i < navigation.length - 1}
                            <span class="text-white/20">|</span>
                        {/if}
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

<style>
	/* Ensure footer styles are not overridden by Bootstrap */
	:global(footer.dmv-footer) {
		position: fixed !important;
		bottom: 0 !important;
		left: 0 !important;
		right: 0 !important;
		z-index: 50 !important;
	}
	
	:global(footer.dmv-footer .container) {
		max-width: 100% !important;
		padding-left: 1rem !important;
		padding-right: 1rem !important;
	}
	
	/* Prevent Bootstrap from removing custom background gradients */
	:global(footer.dmv-footer.bg-gradient-to-r) {
		background-image: linear-gradient(to right, var(--tw-gradient-stops)) !important;
		background-color: transparent !important;
	}
	
	/* Ensure text colors are preserved */
	:global(footer.dmv-footer a) {
		text-decoration: none !important;
	}
</style>