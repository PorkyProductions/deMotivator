<script lang="ts">
	import Icon from '../../../components/icon.svelte';

	const {
		onSaveSettings,
		onDownloadSettings
	}: {
		onSaveSettings: () => Promise<void>;
		onDownloadSettings: () => void;
	} = $props();
</script>

<div class="card border-0 shadow-sm">
	<div class="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
		<div>
			<h2 class="h5 mb-1">
				<Icon name="floppy-fill" /> Save or export settings
			</h2>
			<p class="text-muted small mb-0">
				Save to your account or download as JSON.
			</p>
		</div>
		<div class="d-flex flex-wrap gap-2">
			<button class="btn btn-primary" onclick={onSaveSettings}>
				<Icon name="floppy-fill" /> Save
			</button>
			<button class="btn btn-outline-primary" onclick={onDownloadSettings}>
				<Icon name="download" /> Export JSON
			</button>
		</div>
	</div>
</div>
