<script lang="ts">
	import { Icon } from '@demotivator/ui';
	import { blur, fade, fly, scale } from 'svelte/transition';

	interface StoryModeProps {
		progress: number;
		isEmoticon: boolean;
		isAction: boolean;
		currentLine: string;
		currentLineIndex: number;
		linesLength: number;
		paused: boolean;
		storyComplete: boolean;
		previousLine: () => void;
		nextLine: () => void;
		togglePause: () => void;
		restartStory: () => void;
		skipToEnd: () => void;
	}

	const {
		progress,
		isEmoticon,
		isAction,
		currentLine,
		currentLineIndex,
		linesLength,
		paused,
		storyComplete,
		previousLine,
		nextLine,
		togglePause,
		restartStory,
		skipToEnd
	}: StoryModeProps = $props();
</script>

<div transition:fade class="mb-5">
	<div class="card border-0 shadow-sm mb-3">
		<div class="card-body p-2">
			<div class="progress" style="height: 4px;">
				<div
					class="progress-bar bg-gradient"
					role="progressbar"
					style={`width: ${progress}%`}
					aria-valuenow={progress}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
		</div>
	</div>

	<div class="card border-0 shadow-lg mb-4" style="min-height: 300px;">
		<div class="card-body d-flex align-items-center justify-content-center p-5">
			<div class="text-center w-100">
				{#if isEmoticon}
					<div transition:scale class="display-1 mb-3">
						{currentLine}
					</div>
				{:else if isAction}
					<div transition:blur class="fst-italic text-secondary fs-4">
						{currentLine}
					</div>
				{:else if currentLine === 'YAY!'}
					<div transition:scale class="display-3 fw-bold text-success">
						{currentLine}
					</div>
				{:else if currentLine.includes('💔')}
					<div transition:scale class="display-3 text-danger">
						{currentLine}
					</div>
				{:else if currentLine === 'THE END'}
					<div transition:scale class="display-4 fw-bold text-primary">
						{currentLine}
					</div>
				{:else}
					<div transition:fly={{ y: 10 }} class="fs-3 lh-base">
						{currentLine}
					</div>
				{/if}

				{#if currentLine === "The name's Bartholomew."}
					<div transition:fade={{ delay: 500 }} class="mt-3">
						<img
							src={'https://tse2.mm.bing.net/th/id/OIP.Y3M6jxNvPLX-JTYyOD7KtgHaFf?rs=1&pid=ImgDetMain&o=7&rm=3'}
							alt="Bartholomew"
							class="rounded-circle"
							style="width: 100px; height: 100px;"
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="card border-0 shadow-sm mb-4">
		<div class="card-body">
			<div class="d-flex justify-content-between align-items-center">
				<div class="btn-group" role="group">
					<button
						class="btn btn-outline-secondary"
						onclick={previousLine}
						disabled={currentLineIndex === 0}
					>
						<Icon name="skip-backward" />
					</button>
					<button
						class="btn btn-outline-primary"
						onclick={togglePause}
					>
						{#if paused}
							<Icon name="play-fill" /> Play
						{:else}
							<Icon name="pause-fill" /> Pause
						{/if}
					</button>
					<button
						class="btn btn-outline-secondary"
						onclick={nextLine}
						disabled={currentLineIndex >= linesLength - 1}
					>
						<Icon name="skip-forward" />
					</button>
				</div>

				<div class="text-muted small">
					{currentLineIndex + 1} / {linesLength}
				</div>

				<div class="btn-group" role="group">
					<button
						class="btn btn-outline-warning btn-sm"
						onclick={restartStory}
					>
						<Icon name="arrow-clockwise" /> Restart
					</button>
					{#if !storyComplete}
						<button
							class="btn btn-outline-danger btn-sm"
							onclick={skipToEnd}
						>
							<Icon name="fast-forward" /> Skip
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>

	{#if storyComplete}
		<div transition:fly={{ y: 20 }} class="card border-0 shadow-lg bg-primary bg-opacity-10">
			<div class="card-body text-center py-4">
				<h3 class="card-title fw-bold">The End</h3>
				<p class="card-text mb-3">
					Thanks for staying until the end! Bartholomew appreciates it.
				</p>
				<div class="d-flex gap-3 justify-content-center">
					<a href="/" class="btn btn-primary btn-lg shadow-sm">
						<Icon name="house-door" /> Go Home
					</a>
					<button class="btn btn-outline-primary btn-lg" onclick={restartStory}>
						<Icon name="arrow-clockwise" /> Read Again
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
