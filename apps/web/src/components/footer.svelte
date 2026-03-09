<script lang="ts">
	import { onDestroy } from 'svelte';
	import hedgehog from '../img/HedgehogIcon.png';
	import Title from './title.svelte';
	import { Icon } from '@demotivator/ui-components';
	import { OS, deviceType } from '../utils/uaStub';
	import SiwGoogleButton from './siwGoogleButton.svelte';
	import { parentCompany } from '../typescript/constants';
	import { navigation } from '../utils/navigation';
	import { adminAccessStore } from '../utils/adminAccess';

	const year = new Date().getFullYear();
	const initialHedgehogSpinDuration = 10;
	const accelerationFactor = 0.92; // reduce duration by 100 - _% each interval
	const accelerationInterval = 500; // every _ ms
	let hedgehogSpinDuration = $state(initialHedgehogSpinDuration);
	let hedgehogAccelerationTimer: ReturnType<typeof setInterval> | undefined;

	// Logic: derived check for mobile/tablet to clean up the template
	const isMobileView = deviceType === 'mobile' || (deviceType === 'tablet' && (OS === 'Android' || OS === 'iOS'));

	// Only show admin link when user is authenticated AND admin field is explicitly true
	const showAdminLink = $derived(
		$adminAccessStore.isAuthenticated === true &&
		$adminAccessStore.isAdmin === true &&
		$adminAccessStore.loading === false
	);

	const startHedgehogAcceleration = () => {
		if (hedgehogAccelerationTimer) {
			clearInterval(hedgehogAccelerationTimer);
		}

		hedgehogSpinDuration = initialHedgehogSpinDuration;
		hedgehogAccelerationTimer = setInterval(() => {
			hedgehogSpinDuration *= accelerationFactor;
		}, accelerationInterval);
	};

	const stopHedgehogAcceleration = () => {
		if (hedgehogAccelerationTimer) {
			clearInterval(hedgehogAccelerationTimer);
			hedgehogAccelerationTimer = undefined;
		}

		hedgehogSpinDuration = initialHedgehogSpinDuration;
	};

	onDestroy(() => {
		stopHedgehogAcceleration();
	});
</script>

{#if isMobileView}
	<footer class="dmv-footer fixed bottom-0 left-0 right-0 z-50 bg-linear-to-r from-primary-majorelle-blue via-indigo-600 to-primary-majorelle-blue dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl border-t border-white/10 backdrop-blur-md">
		<div class="px-4 py-2">
			<div class="flex items-center justify-between">
				<!-- Mobile Navigation: icon-only buttons -->
				<nav class="flex items-center gap-1">
					{#each navigation as link}
						<a
							href={link.href}
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noopener noreferrer' : undefined}
							title={link.name}
							class="flex flex-col items-center px-2 py-1 text-white/80 hover:text-white transition-all duration-200 hover:scale-110 text-xs gap-0.5"
						>
							<Icon name={link.icon} />
							<span class="text-[10px] leading-none">{link.shortName}</span>
						</a>
					{/each}
					{#if showAdminLink}
						<a
							href="/admin.html"
							title="Admin"
							class="flex flex-col items-center px-2 py-1 text-warning hover:text-white transition-all duration-200 hover:scale-110 text-xs gap-0.5"
						>
							<Icon name="speedometer2" />
							<span class="text-[10px] leading-none">Admin</span>
						</a>
					{/if}
				</nav>
				<!-- Mobile Account Button: compact icon + label -->
				<a href="/account.html" class="btn btn-sm btn-light flex items-center gap-1 text-xs">
					<Icon name="person-circle" />
					<span>Account</span>
				</a>
			</div>
		</div>
	</footer>

	<div class="h-16"></div>

{:else}
	<footer
		class="dmv-footer fixed bottom-0 left-0 right-0 z-50 py-3 shadow-2xl border-t border-white/10
		bg-linear-to-r from-primary-majorelle-blue via-indigo-600 to-primary-majorelle-blue dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md portrait:hidden text-white"
	>
		<div class="container mx-auto px-6">
			<div class="flex justify-between items-center">
				<!-- Left section: Hedgehog + Title + Copyright -->
				<div class="flex items-center gap-4">
					<a href="https://porkyproductions.github.io" class="block group" onmouseenter={startHedgehogAcceleration} onmouseleave={stopHedgehogAcceleration}>
						<img src={hedgehog} alt="Hedgehog" class="w-11 h-11 group-hover:animate-spin object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110" style={`animation-duration: ${hedgehogSpinDuration}s;`} />
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
						{#if i < navigation.length - 1 || showAdminLink}
							<span class="text-white/20">|</span>
						{/if}
					{/each}
					{#if showAdminLink}
						<a
							class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-warning hover:text-white hover:bg-white/10 transition-all duration-200"
							href="/admin.html"
						>
							<Icon name="speedometer2" />
							<span>Admin</span>
						</a>
					{/if}
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
		color: white !important;
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

	/* Ensure text colors are preserved - override Bootstrap reboot */
	:global(footer.dmv-footer a),
	:global(footer.dmv-footer a:link),
	:global(footer.dmv-footer a:visited),
	:global(footer.dmv-footer a:hover),
	:global(footer.dmv-footer a:active) {
		text-decoration: none !important;
	}

	:global(footer.dmv-footer .text-white) {
		color: white !important;
	}

	:global(footer.dmv-footer .text-white\/80),
	:global(footer.dmv-footer [class*="text-white/80"]) {
		color: rgba(255, 255, 255, 0.8) !important;
	}

	:global(footer.dmv-footer .text-white\/60),
	:global(footer.dmv-footer [class*="text-white/60"]) {
		color: rgba(255, 255, 255, 0.6) !important;
	}

	:global(footer.dmv-footer .text-white\/20),
	:global(footer.dmv-footer [class*="text-white/20"]) {
		color: rgba(255, 255, 255, 0.2) !important;
	}

	/* Ensure Title component text is white */
	:global(footer.dmv-footer #logoText),
	:global(footer.dmv-footer #logoText *),
	:global(footer.dmv-footer #logoText h1),
	:global(footer.dmv-footer #logoText a) {
		color: white !important;
		font-size: inherit !important;
	}

</style>
