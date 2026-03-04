<script lang="ts">
import Spinhog from '../../../components/spinhog.svelte';
import { fade } from 'svelte/transition';
</script>

<div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-body backdrop-blur-sm">
<Spinhog />
</div>
