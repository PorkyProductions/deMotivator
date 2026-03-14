<script lang="ts">
import { Icon } from '@demotivator/ui';
import Title from '../../../components/title.svelte';

interface Props {
loading: boolean;
onRefresh: () => void;
}

const {
	loading,
	onRefresh
}: Props = $props();
</script>

<div class="bg-linear-to-br from-primary-subtle to-body-tertiary py-5 px-4 mb-5">
<div class="container">
<div class="text-center">
<a href="/" class="text-decoration-none">
<span class="display-6 fw-bold text-body">
<Title />
</span>
</a>
<h1 class="display-5 fw-bold mt-3 mb-2">
<Icon name="speedometer2" /> Admin Dashboard
</h1>
<p class="text-muted">Welcome, Administrator</p>
<button
onclick={onRefresh}
class="btn btn-primary mt-2"
disabled={loading}
>
{#if loading}
<span class="spinner-border spinner-border-sm me-2" role="status"></span>
Refreshing...
{:else}
<Icon name="arrow-clockwise" /> Refresh Data
{/if}
</button>
</div>
</div>
</div>
