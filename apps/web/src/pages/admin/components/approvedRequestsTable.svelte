<script lang="ts">
import { fade } from 'svelte/transition';
import { Icon } from '@demotivator/ui';
import type { InsultRequest } from '../../../utils/insultRequests';

interface Props {
approvedRequests: InsultRequest[];
approvedCount: number;
loading: boolean;
onFlush: () => Promise<void>;
formatDate: (date: Date) => string;
}

const {
	approvedRequests,
	approvedCount,
	loading,
	onFlush,
	formatDate
}: Props = $props();
</script>

<div class="d-flex justify-content-between align-items-center mb-3">
<h3 class="h6 mb-0">Approved Insult Requests</h3>
{#if approvedRequests.length > 0}
<button
class="btn btn-sm btn-danger"
onclick={onFlush}
disabled={loading}
>
<Icon name="trash" /> Flush Approved List ({approvedCount})
</button>
{/if}
</div>

{#if approvedRequests.length === 0}
<div class="text-center py-5 text-muted">
<Icon name="check-circle" />
<p class="mt-3">No approved requests</p>
</div>
{:else}
<div class="table-responsive">
<table class="table table-striped table-hover mb-0">
<thead>
<tr>
<th>Insult Text</th>
<th>Submitted By</th>
<th>Approved</th>
</tr>
</thead>
<tbody>
{#each approvedRequests as request (request.id)}
<tr transition:fade>
<td class="align-middle">"{request.text}"</td>
<td class="align-middle">
<div class="small">
<div class="fw-semibold">{request.requestedByName || 'Anonymous'}</div>
<div class="text-muted">{request.requestedByEmail || 'N/A'}</div>
</div>
</td>
<td class="align-middle">
<small class="text-muted">{request.reviewedAt ? formatDate(request.reviewedAt) : 'N/A'}</small>
</td>
</tr>
{/each}
</tbody>
</table>
</div>
{/if}
