<script lang="ts">
import '../styles/scss/darkMode.scss';
import type { BSVarient } from '../typescript/types';
import Icon from './icon.svelte';
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
	}: {
		preButtonType: BSVarient;
		preButtonText: string;
		preButtonIcon: string;
		icon: string;
		title: string;
		body: string;
		confirmButtonType: BSVarient;
		confirmButtonText: string;
		confirmButtonAction: () => void;
		closeButtonType: BSVarient;
		closeButtonText: string;
	} = $props();
</script>

<!-- Button trigger modal -->
<button type="button" class="btn btn-{preButtonType}" data-bs-toggle="modal" data-bs-target="#exampleModal" id="bsModal" onmouseover={load} onfocus={load}>
	<Icon name={preButtonIcon} />{preButtonText}
</button>

<!-- Modal -->
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

