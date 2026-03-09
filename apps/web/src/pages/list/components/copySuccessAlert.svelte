<script lang="ts">
import { Icon } from '@demotivator/ui';
import { fly } from 'svelte/transition';
</script>

<div transition:fly={{ y: -20 }} class="position-fixed top-0 start-50 translate-middle-x mt-3 z-3">
<div class="alert alert-success shadow-lg" role="alert">
<Icon name="check-circle-fill" /> Copied to clipboard!
</div>
</div>
