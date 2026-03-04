<script lang="ts">
import { fade } from 'svelte/transition';
import Icon from '../../../components/icon.svelte';
import type { InsultRequest } from '../../../utils/insultRequests';

interface Props {
rejectedRequests: InsultRequest[];
formatDate: (date: Date) => string;
}

const {
	rejectedRequests,
	formatDate
}: Props = $props();
</script>

{#if rejectedRequests.length === 0}
<div class="text-center py-5 text-muted">
<Icon name="x-circle" />
<p class="mt-3">No rejected requests</p>
</div>
{:else}
<div class="table-responsive">
<table class="table table-striped table-hover mb-0">
<thead>
<tr>
<th>Insult Text</th>
<th>Submitted By</th>
<th>Rejected</th>
</tr>
</thead>
<tbody>
{#each rejectedRequests as request (request.id)}
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
