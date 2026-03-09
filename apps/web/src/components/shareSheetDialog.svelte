<script lang="ts">
	import Icon from './icon.svelte';
	import type { ShareDestination, ShareProviderButton } from '../utils/shareSheet';

	interface Props {
		dialogTitle: string;
		dialogDescription: string;
		previewText: string;
		buttons: ShareProviderButton[];
		onCloseDialog: () => void;
		onShare: (destination: ShareDestination) => Promise<void>;
	}

	const {
		dialogTitle,
		dialogDescription,
		previewText,
		buttons,
		onCloseDialog,
		onShare
	}: Props = $props();
</script>

<div class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="shareSheetDialogTitle">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title fs-5" id="shareSheetDialogTitle">
					<Icon name="share" /> {dialogTitle}
				</h2>
				<button type="button" class="btn-close" aria-label="Close" onclick={onCloseDialog}></button>
			</div>
			<div class="modal-body">
				<p class="text-muted small mb-2">{dialogDescription}</p>
				<p class="mb-3">{previewText}</p>
				<div class="d-grid gap-2">
					{#each buttons as button}
						<button
							type="button"
							class={`btn ${button.buttonClass}`}
							onclick={() => onShare(button.destination)}
						>
							<Icon name={button.icon} /> {button.label}
						</button>
					{/each}
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" onclick={onCloseDialog}>Close</button>
			</div>
		</div>
	</div>
</div>
<div class="modal-backdrop fade show"></div>

<style>
	:global(.share-btn-x) {
		--dmv-ppio-btn-color: #ffffff;
		--dmv-ppio-btn-bg: #000000;
		--dmv-ppio-btn-border-color: #000000;
		--dmv-ppio-btn-hover-color: #ffffff;
		--dmv-ppio-btn-hover-bg: #1f1f1f;
		--dmv-ppio-btn-hover-border-color: #1f1f1f;
		--dmv-ppio-btn-active-color: #ffffff;
		--dmv-ppio-btn-active-bg: #2f2f2f;
		--dmv-ppio-btn-active-border-color: #2f2f2f;
	}

	:global(.share-btn-facebook) {
		--dmv-ppio-btn-color: #ffffff;
		--dmv-ppio-btn-bg: #0064e0;
		--dmv-ppio-btn-border-color: #0064e0;
		--dmv-ppio-btn-hover-color: #ffffff;
		--dmv-ppio-btn-hover-bg: #0064e0;
		--dmv-ppio-btn-hover-border-color: #0064e0;
		--dmv-ppio-btn-active-color: #ffffff;
		--dmv-ppio-btn-active-bg: #155ec2;
		--dmv-ppio-btn-active-border-color: #155ec2;
	}

	:global(.share-btn-reddit) {
		--dmv-ppio-btn-color: #ffffff;
		--dmv-ppio-btn-bg: #ff4500;
		--dmv-ppio-btn-border-color: #ff4500;
		--dmv-ppio-btn-hover-color: #ffffff;
		--dmv-ppio-btn-hover-bg: #e63d00;
		--dmv-ppio-btn-hover-border-color: #e63d00;
		--dmv-ppio-btn-active-color: #ffffff;
		--dmv-ppio-btn-active-bg: #cc3600;
		--dmv-ppio-btn-active-border-color: #cc3600;
	}

	:global(.share-btn-other) {
		--dmv-ppio-btn-color: #ffffff;
		--dmv-ppio-btn-bg: #14b8a6;
		--dmv-ppio-btn-border-color: #14b8a6;
		--dmv-ppio-btn-hover-color: #ffffff;
		--dmv-ppio-btn-hover-bg: #0f9f90;
		--dmv-ppio-btn-hover-border-color: #0f9f90;
		--dmv-ppio-btn-active-color: #ffffff;
		--dmv-ppio-btn-active-bg: #0d8a7c;
		--dmv-ppio-btn-active-border-color: #0d8a7c;
	}
</style>
