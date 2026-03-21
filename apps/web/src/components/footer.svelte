<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Icon } from '@demotivator/ui';
	import hedgehog from '../img/HedgehogIcon.png';
	import Title from './title.svelte';
	import { portal } from '../utils/portal';
	import { parentCompany } from '../typescript/constants';
	import { navigation } from '../utils/navigation';
	import { adminAccessStore } from '../utils/adminAccess';

	const year = new Date().getFullYear();
	const initialHedgehogSpinDuration = 10;
	const accelerationFactor = 0.92;
	const accelerationInterval = 500;
	let navigationOpen = $state(false);
	let hedgehogSpinDuration = $state(initialHedgehogSpinDuration);
	let hedgehogAccelerationTimer: ReturnType<typeof setInterval> | undefined;

	const showAdminLink = $derived(
		$adminAccessStore.isAuthenticated === true &&
		$adminAccessStore.isAdmin === true &&
		$adminAccessStore.loading === false
	);

	const navLinks = $derived.by(() => {
		const accountLink = {
			name: 'Account',
			shortName: 'Account',
			href: '/account.html',
			icon: 'person-circle'
		};
		const adminLink = {
			name: 'Admin',
			shortName: 'Admin',
			href: '/admin.html',
			icon: 'speedometer2'
		};
		return showAdminLink ? [...navigation, accountLink, adminLink] : [...navigation, accountLink];
	});

	const startHedgehogAcceleration = () => {
		if (hedgehogAccelerationTimer) {
			clearInterval(hedgehogAccelerationTimer);
		}

		hedgehogSpinDuration = initialHedgehogSpinDuration;
		hedgehogAccelerationTimer = setInterval(() => {
			hedgehogSpinDuration = Math.max(0.6, hedgehogSpinDuration * accelerationFactor);
		}, accelerationInterval);
	};

	const stopHedgehogAcceleration = () => {
		if (hedgehogAccelerationTimer) {
			clearInterval(hedgehogAccelerationTimer);
			hedgehogAccelerationTimer = undefined;
		}

		hedgehogSpinDuration = initialHedgehogSpinDuration;
	};

	const openNavigation = () => {
		navigationOpen = true;
	};

	const closeNavigation = () => {
		navigationOpen = false;
	};

	const onWindowKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && navigationOpen) {
			closeNavigation();
		}
	};

	onMount(() => {
		window.addEventListener('keydown', onWindowKeyDown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', onWindowKeyDown);
		stopHedgehogAcceleration();
		document.body.style.overflow = '';
	});

	$effect(() => {
		document.body.style.overflow = navigationOpen ? 'hidden' : '';
	});
</script>

<button
	type="button"
	use:portal
	onclick={openNavigation}
	onmouseenter={startHedgehogAcceleration}
	onmouseleave={stopHedgehogAcceleration}
	aria-haspopup="dialog"
	aria-expanded={navigationOpen}
	aria-controls="dmv-slideover-navigation"
	class={`fixed top-1/2 right-[-0.5rem] -translate-y-1/2 z-[80] rounded-l-full rounded-r-3xl border border-white/25 shadow-2xl backdrop-blur-xl pr-4 pl-3 py-2.5 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-linear-to-b from-primary-majorelle-blue/95 via-indigo-600/95 to-primary-majorelle-blue/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 hover:right-0 hover:scale-[1.02] ${navigationOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
>
	<span class="sr-only">Open navigation menu</span>
	<span class="flex items-center gap-2">
		<img
			src={hedgehog}
			alt="Navigation trigger icon"
			class="h-8 w-8 object-contain drop-shadow-md"
			style={`animation-duration: ${hedgehogSpinDuration}s;`}
		/>
		<span class="inline-flex items-center justify-center rounded-full bg-white/15 border border-white/30 h-8 w-8">
			<Icon name="list" />
		</span>
		<span class="text-sm font-semibold tracking-wide">Menu</span>
	</span>
</button>

<div
	id="dmv-slideover-navigation"
	use:portal
	role="dialog"
	aria-modal="true"
	aria-label="Site navigation"
	aria-hidden={!navigationOpen}
	class={`fixed inset-0 z-[90] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${navigationOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
>
	<button
		type="button"
		class={`absolute inset-0 backdrop-blur-sm transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${navigationOpen ? 'bg-black/65 opacity-100' : 'bg-black/30 opacity-0'}`}
		onclick={closeNavigation}
		aria-label="Close navigation menu backdrop"
	></button>

	<div class="absolute inset-0">
		<div
			class="w-full h-full max-w-none rounded-none border-l border-white/10 bg-linear-to-br from-primary-majorelle-blue via-indigo-600 to-primary-majorelle-blue dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white shadow-2xl flex flex-col transition-[clip-path,transform,opacity] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
			style={`clip-path: ${navigationOpen ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)'}; transform: ${navigationOpen ? 'translateX(0) scale(1)' : 'translateX(2rem) scale(0.985)'}; opacity: ${navigationOpen ? '1' : '0.72'};`}
		>
			<div class="flex items-center justify-between p-4 sm:p-6">
				<div class="flex items-center gap-3">
					<a
						href="https://porkyproductions.github.io"
						class="group block"
						onmouseenter={startHedgehogAcceleration}
						onmouseleave={stopHedgehogAcceleration}
					>
						<img
							src={hedgehog}
							alt="PorkyProductions icon"
							class="h-11 w-11 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:animate-spin"
							style={`animation-duration: ${hedgehogSpinDuration}s;`}
						/>
					</a>
					<div class="text-2xl sm:text-3xl" id="logoText">
						<Title />
					</div>
				</div>
				<button type="button" class="btn btn-outline-light btn-lg" onclick={closeNavigation} aria-label="Close navigation menu">
					<Icon name="x-lg" /> Close
				</button>
			</div>

			<div class="flex-1 flex items-center justify-center px-4">
				<nav class="d-flex flex-column items-center text-center gap-3 sm:gap-4 w-full max-w-6xl">
					{#each navLinks as link, i}
						<a
							href={link.href}
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noopener noreferrer' : undefined}
							onclick={closeNavigation}
							style={`transition-delay: ${navigationOpen ? `${Math.min(i * 60, 360)}ms` : '0ms'};`}
							class={`group rounded-3xl w-full px-5 py-3 text-3xl sm:text-4xl md:text-5xl font-semibold no-underline border border-white/15 transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.015] hover:bg-white/15 ${navigationOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${link.name === 'Admin' ? 'text-warning' : 'text-white'}`}
						>
							<span class="inline-flex items-center justify-center gap-3 w-full">
								<span class="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
									<Icon name={link.icon} />
								</span>
								<span>{link.name}</span>
								{#if link.external}
									<span class="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
										<Icon name="box-arrow-up-right" />
									</span>
								{/if}
							</span>
						</a>
					{/each}
				</nav>
			</div>

			<div class="pb-8 sm:pb-10 px-4 text-center">
				<div class="text-sm sm:text-lg text-white/80">
					<Icon name="c-circle" /> {year} {parentCompany}. All rights reserved.
				</div>
			</div>
		</div>
	</div>
</div>
