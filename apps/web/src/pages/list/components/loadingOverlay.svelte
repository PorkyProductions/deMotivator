<script lang="ts">
import BsSpinner from '../../../components/bs-spinner.svelte';
import BsLoader from '../../../components/bsLoader.svelte';
import { fade } from 'svelte/transition';

interface Props {
duration: number;
}

const { duration }: Props = $props();
</script>

<div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-body backdrop-blur-sm">
<div class="mb-4">
<BsSpinner type="primary" />
</div>
<BsLoader type="primary" loadingTime={duration} />
</div>
