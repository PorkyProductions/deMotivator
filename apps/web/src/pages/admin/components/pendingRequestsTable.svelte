<script lang="ts">
import { fade } from 'svelte/transition';
import Icon from '../../../components/icon.svelte';
import type { InsultRequest } from '../../../utils/insultRequests';

interface Props {
pendingRequests: InsultRequest[];
approvingIds: Set<string>;
rejectingIds: Set<string>;
onApprove: (requestId: string) => Promise<void>;
onReject: (requestId: string) => Promise<void>;
formatDate: (date: Date) => string;
}

const {
	pendingRequests,
	approvingIds,
	rejectingIds,
	onApprove,
	onReject,
	formatDate
}: Props = $props();
</script>

{#if pendingRequests.length === 0}
<div class="text-center py-5 text-muted">
<Icon name="inbox" />
<p class="mt-3">No pending requests</p>
</div>
{:else}
<div class="table-responsive">
<table class="table table-striped table-hover mb-0">
<thead>
<tr>
<th>Insult Text</th>
<th>Submitted By</th>
<th>Created</th>
<th style="width: 180px;">Actions</th>
</tr>
</thead>
<tbody>
{#each pendingRequests as request (request.id)}
<tr transition:fade>
<td class="align-middle">"{request.text}"</td>
<td class="align-middle">
<div class="small">
<div class="fw-semibold">{request.requestedByName || 'Anonymous'}</div>
<div class="text-muted">{request.requestedByEmail || 'N/A'}</div>
</div>
</td>
<td class="align-middle">
<small class="text-muted">{formatDate(request.createdAt)}</small>
</td>
<td class="align-middle">
<div class="btn-group btn-group-sm" role="group">
<button
class="btn btn-success"
onclick={() => onApprove(request.id!)}
disabled={approvingIds.has(request.id!) || rejectingIds.has(request.id!)}
>
{#if approvingIds.has(request.id!)}
<span class="spinner-border spinner-border-sm" role="status"></span>
{:else}
<Icon name="check-lg" />
{/if}
</button>
<button
class="btn btn-danger"
onclick={() => onReject(request.id!)}
disabled={approvingIds.has(request.id!) || rejectingIds.has(request.id!)}
>
{#if rejectingIds.has(request.id!)}
<span class="spinner-border spinner-border-sm" role="status"></span>
{:else}
<Icon name="x-lg" />
{/if}
</button>
</div>
</td>
</tr>
{/each}
</tbody>
</table>
</div>
{/if}
