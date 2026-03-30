<script lang="ts">
	import { Icon } from '@demotivator/ui';

	const {
		onSaveSettings,
		onDownloadSettings
	}: {
		onSaveSettings: () => Promise<void>;
		onDownloadSettings: () => void;
	} = $props();
</script>

<div class="card border-0 shadow-sm rounded-4 border-l-4 border-primary-majorelle-blue dark:border-primary-majorelle-blue">
	<div class="card-body px-4 py-3">
		<div class="d-flex align-items-start gap-3">
			<div class="data-icon-wrap flex-shrink-0 mt-1">
				<Icon name="floppy-fill" />
			</div>
			<div class="flex-grow-1">
				<div class="fw-semibold mb-1">Save or export settings</div>
				<p class="text-muted small mb-3">
					Save to your account or download a local JSON backup.
				</p>
				<div class="d-flex flex-wrap gap-2">
					<button class="btn btn-primary rounded-pill px-4" onclick={onSaveSettings}>
						<Icon name="floppy-fill" /> Save
					</button>
					<button class="btn btn-outline-primary rounded-pill px-4" onclick={onDownloadSettings}>
						<Icon name="download" /> Export JSON
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.data-icon-wrap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: rgb(79 70 229 / 10%);
		color: #4f46e5;
		font-size: 1rem;
		flex-shrink: 0;
	}

	:global([data-bs-theme='dark']) .data-icon-wrap {
		background: rgb(79 70 229 / 22%);
		color: #818cf8;
	}
</style>
