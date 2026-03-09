<script lang="ts">
import { fade } from 'svelte/transition';
import { Icon } from '@demotivator/ui';
import type { InsultRequest } from '../../../utils/insultRequests';

interface Props {
recentRequests: InsultRequest[];
formatDate: (date: Date) => string;
}

const {
	recentRequests,
	formatDate
}: Props = $props();
</script>

{#if recentRequests.length === 0}
<div class="text-center py-5 text-muted">
<Icon name="list-ul" />
<p class="mt-3">No recent activity</p>
</div>
{:else}
<div class="table-responsive">
<table class="table table-striped table-hover mb-0">
<thead>
<tr>
<th>Insult Text</th>
<th>Status</th>
<th>Submitted By</th>
<th>Created</th>
</tr>
</thead>
<tbody>
{#each recentRequests as request (request.id)}
<tr transition:fade>
<td class="align-middle">"{request.text}"</td>
<td class="align-middle">
{#if request.status === 'pending'}
<span class="badge bg-warning">Pending</span>
{:else if request.status === 'approved'}
<span class="badge bg-success">Approved</span>
{:else}
<span class="badge bg-danger">Rejected</span>
{/if}
</td>
<td class="align-middle">
<div class="small">
<div class="fw-semibold">{request.requestedByName || 'Anonymous'}</div>
<div class="text-muted">{request.requestedByEmail || 'N/A'}</div>
</div>
</td>
<td class="align-middle">
<small class="text-muted">{formatDate(request.createdAt)}</small>
</td>
</tr>
{/each}
</tbody>
</table>
</div>
{/if}
