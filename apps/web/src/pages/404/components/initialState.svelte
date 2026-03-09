<script lang="ts">
	import { Icon } from '@demotivator/ui-components';
	import { fly, scale } from 'svelte/transition';

	interface InitialStateProps {
		randomErrorMessage: string;
		showStarted?: boolean;
		startStory: () => void;
	}

	let {
		randomErrorMessage,
		showStarted = $bindable(false),
		startStory
	}: InitialStateProps = $props();
</script>

<div transition:scale class="text-center mb-5">
	<div class="position-relative d-inline-block mb-4">
		<h1 class="display-1 fw-bold text-danger mb-0" style="font-size: 10rem; line-height: 1;">
			4<span class="text-warning">0</span>4
		</h1>
		<div class="position-absolute top-50 start-50 translate-middle">
			<div class="spinner-grow text-warning opacity-25" style="width: 8rem; height: 8rem;" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>

	<h2 class="h3 fw-bold mb-3">Page Not Found</h2>
	<p class="lead text-secondary mb-4">{randomErrorMessage}</p>

	<div class="card border-0 shadow-sm mb-4">
		<div class="card-body">
			<h5 class="card-title">
				<Icon name="exclamation-triangle" /> What happened?
			</h5>
			<p class="card-text text-muted">
				At this point it could be anything, but we're suspecting it's your fault.
				Look, there's something interesting below. Maybe try it and see what happens.
			</p>
			<div class="list-group list-group-flush mt-3">
				<div class="list-group-item bg-transparent">
					<Icon name="link-45deg" /> You may have typed the URL incorrectly
				</div>
				<div class="list-group-item bg-transparent">
					<Icon name="bookmark-x" /> The page may have been moved or deleted
				</div>
				<div class="list-group-item bg-transparent">
					<Icon name="wifi-off" /> There might be a temporary issue
				</div>
			</div>
		</div>
	</div>

	<div class="card border-danger shadow-lg" transition:fly={{ y: 20, delay: 300 }}>
		<div class="card-body text-center py-4">
			<p class="text-danger fw-bold mb-3">
				<Icon name="hand-index-thumb" /> you might wanna click this
			</p>
			<div class="form-check form-switch d-inline-block">
				<input
					class="form-check-input fs-1"
					type="checkbox"
					role="switch"
					id="mysterySwitch"
					bind:checked={showStarted}
					onchange={startStory}
					style="width: 4rem; height: 2rem; cursor: pointer;"
				/>
			</div>
		</div>
	</div>
</div>
