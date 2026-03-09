<script lang="ts">
import { Icon } from '@demotivator/ui-components';
import { fly } from 'svelte/transition';

	interface Props {
		requestText: string;
		requestSubmitting: boolean;
		requestSuccess: string;
		requestError: string;
		onRequestTextChange: (value: string) => void;
		onSubmitRequest: () => Promise<void>;
	}

	const {
		requestText,
		requestSubmitting,
		requestSuccess,
		requestError,
		onRequestTextChange,
		onSubmitRequest
	}: Props = $props();
</script>

<div class="card border-0 shadow-sm mb-4" transition:fly={{ y: 20, delay: 250 }}>
<div class="card-body">
<h2 class="h6 mb-3 fw-bold">
<Icon name="chat-left-text" /> Request a New Insult
</h2>
<p class="text-muted small mb-3">
Have an idea for a demotivating insult? Submit it for review!
</p>
<div class="row g-2">
<div class="col-lg-8">
				<input
					type="text"
					class="form-control"
					placeholder="Your demotivating insult idea..."
					value={requestText}
					oninput={(event) => onRequestTextChange((event.currentTarget as HTMLInputElement).value)}
					disabled={requestSubmitting}
					maxlength="500"
				/>
</div>
<div class="col-lg-4">
<button
class="btn btn-primary w-100"
onclick={onSubmitRequest}
disabled={requestSubmitting || !requestText.trim()}
>
{#if requestSubmitting}
<span class="spinner-border spinner-border-sm me-2" role="status"></span>
Submitting...
{:else}
<Icon name="send" /> Submit Request
{/if}
</button>
</div>
</div>
{#if requestSuccess}
<div transition:fly={{ y: -10 }} class="alert alert-success mt-3 mb-0">
<Icon name="check-circle-fill" /> {requestSuccess}
</div>
{/if}
{#if requestError}
<div transition:fly={{ y: -10 }} class="alert alert-danger mt-3 mb-0">
<Icon name="exclamation-triangle-fill" /> {requestError}
</div>
{/if}
</div>
</div>
