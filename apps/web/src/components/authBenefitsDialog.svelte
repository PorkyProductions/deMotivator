<script lang="ts">
	import { Icon } from '@demotivator/ui-components';

	const {
		modalId,
		buttonClass = 'btn btn-outline-info',
		buttonText = 'Why use PorkyProductionsID?',
		buttonIcon = 'info-circle'
	}: {
		modalId: string;
		buttonClass?: string;
		buttonText?: string;
		buttonIcon?: string;
	} = $props();

	const loadModal = async () => {
		await import('bootstrap/js/dist/modal');
	};
	const benefits = [
		'Syncing between devices with shared account data.',
		'Insult streak tracking.',
		'Achievements for insult milestones',
		'Access to the leaderboard.',
		'The ability to view all insults and favorite them.',
		'The ability to send insult requests.',
		'The ability to use settings and personalize your experience.',
		'Works with all PorkyProductions products, and it\'s free.'
	];
</script>

<button
	type="button"
	class={buttonClass}
	data-bs-toggle="modal"
	data-bs-target={`#${modalId}`}
	onmouseover={loadModal}
	onfocus={loadModal}
>
	<Icon name={buttonIcon} /> {buttonText}
</button>

<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title fs-5 fw-bold" id={`${modalId}Label`}>
					<Icon name="stars" /> Why use (de)Motivator with PorkyProductionsID?
				</h2>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body text-start">
				<p class="mb-3 font-semibold">A free PorkyProductionsID unlocks:</p>
				<ol class="mb-0 ps-3 d-flex flex-column gap-2">
					{#each benefits as benefit}
						<li> <Icon name='check2-circle' />{benefit}</li>
					{/each}
				</ol>
			</div>
			<div class="modal-footer">
				<a href="/signUp.html" class="btn btn-primary">
					<Icon name="person-plus" /> Create Account
				</a>
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
