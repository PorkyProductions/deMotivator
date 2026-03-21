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
	let navigationOpen = $state(false);

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
	aria-haspopup="dialog"
	aria-expanded={navigationOpen}
	aria-controls="dmv-slideover-navigation"
	class={`fixed top-1/2 right-[-0.75rem] -translate-y-1/2 z-[80] rounded-l-3xl border border-white/20 shadow-2xl backdrop-blur-md px-3 py-4 text-white transition-all duration-300 bg-linear-to-b from-primary-majorelle-blue via-indigo-600 to-primary-majorelle-blue dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 hover:right-0 hover:scale-105 ${navigationOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
>
	<span class="sr-only">Open navigation menu</span>
	<span class="flex flex-col items-center gap-2">
		<img src={hedgehog} alt="Navigation trigger icon" class="h-7 w-7 object-contain drop-shadow-md" />
		<Icon name="list" />
	</span>
</button>

<div
	id="dmv-slideover-navigation"
	use:portal
	role="dialog"
	aria-modal="true"
	aria-label="Site navigation"
	aria-hidden={!navigationOpen}
	class={`fixed inset-0 z-[90] transition-opacity duration-300 ${navigationOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
>
	<button
		type="button"
		class="absolute inset-0 bg-black/60 backdrop-blur-sm"
		onclick={closeNavigation}
		aria-label="Close navigation menu backdrop"
	></button>

	<div class={`absolute inset-0 flex items-center justify-center px-4 sm:px-8 transition-transform duration-300 ease-out ${navigationOpen ? 'translate-x-0' : 'translate-x-full'}`}>
		<div class="w-full h-full max-w-none rounded-none border-l border-white/10 bg-linear-to-br from-primary-majorelle-blue via-indigo-600 to-primary-majorelle-blue dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white shadow-2xl flex flex-col">
			<div class="flex items-center justify-between p-4 sm:p-6">
				<div class="flex items-center gap-3">
					<img src={hedgehog} alt="PorkyProductions icon" class="h-10 w-10 object-contain" />
					<div class="text-2xl sm:text-3xl" id="logoText">
						<Title />
					</div>
				</div>
				<button type="button" class="btn btn-outline-light btn-lg" onclick={closeNavigation} aria-label="Close navigation menu">
					<Icon name="x-lg" /> Close
				</button>
			</div>

			<div class="flex-1 flex items-center justify-center px-4">
				<nav class="d-flex flex-column items-center text-center gap-3 sm:gap-4">
					{#each navLinks as link}
						<a
							href={link.href}
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noopener noreferrer' : undefined}
							onclick={closeNavigation}
							class={`rounded-3xl px-5 py-3 text-3xl sm:text-4xl md:text-5xl font-semibold no-underline border border-white/15 transition-all duration-200 hover:scale-105 hover:bg-white/10 ${link.name === 'Admin' ? 'text-warning' : 'text-white'}`}
						>
							<span class="inline-flex items-center gap-3">
								<Icon name={link.icon} />
								<span>{link.name}</span>
								{#if link.external}
									<Icon name="box-arrow-up-right" />
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
