<script lang="ts">
import Icon from '../../../components/icon.svelte';

	interface ShareProviderButton {
		destination: ShareDestination;
		label: string;
		icon: string;
		buttonClass: string;
	}

	type ShareDestination = 'copy' | 'x' | 'facebook' | 'reddit' | 'email' | 'other';

	interface Props {
		shareDialogInsult: string;
		buttons: ShareProviderButton[];
		onCloseDialog: () => void;
		onShareInsult: (destination: ShareDestination) => Promise<void>;
	}

const { shareDialogInsult, buttons, onCloseDialog, onShareInsult }: Props = $props();
</script>

<div class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="shareInsultDialogTitle">
<div class="modal-dialog modal-dialog-centered">
<div class="modal-content">
<div class="modal-header">
<h2 class="modal-title fs-5" id="shareInsultDialogTitle">
<Icon name="share" /> Share insult
</h2>
<button type="button" class="btn-close" aria-label="Close" onclick={onCloseDialog}></button>
</div>
<div class="modal-body">
<p class="text-muted small mb-2">Choose where to share this insult:</p>
<p class="mb-3">"{shareDialogInsult}"</p>
<div class="d-grid gap-2">
{#each buttons as button}
<button
type="button"
class={`btn ${button.buttonClass}`}
onclick={() => onShareInsult(button.destination)}
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
