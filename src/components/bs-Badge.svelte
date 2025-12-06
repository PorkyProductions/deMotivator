<script lang="ts">
    import type { BSVarient } from '../typescript/types';
    let { type, text }: { type: BSVarient; text: string } = $props();
</script>

<span class="badge bg-{type}">{text}</span>
