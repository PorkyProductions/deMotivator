<script lang="ts">
	import Icon from './icon.svelte';
	import type { BsModalProps } from './types';

	const load = async () => {
		await import('bootstrap/js/dist/modal');
	};

	const {
		preButtonType,
		preButtonText,
		preButtonIcon,
		icon,
		title,
		body,
		confirmButtonType,
		confirmButtonText,
		confirmButtonAction,
		closeButtonType,
		closeButtonText
	}: BsModalProps = $props();
</script>

<button type="button" class="btn btn-{preButtonType}" data-bs-toggle="modal" data-bs-target="#exampleModal" id="bsModal" onmouseover={load} onfocus={load}>
	<Icon name={preButtonIcon} />{preButtonText}
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<span>
					<Icon name={icon} />
				</span>
				&nbsp;
				<span>
					<h1 class="modal-title fs-5" id="exampleModalLabel">{title}</h1>
				</span>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				{body}
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-{closeButtonType}" data-bs-dismiss="modal">{closeButtonText}</button>
				<button type="button" class="btn btn-{confirmButtonType}" onclick={confirmButtonAction}>{confirmButtonText}</button>
			</div>
		</div>
	</div>
</div>
