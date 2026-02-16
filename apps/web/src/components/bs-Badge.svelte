<script lang="ts">
    import '../styles/scss/darkMode.scss';
    import type { BSVarient } from '../typescript/types';
    const { type, text }: { type: BSVarient; text: string } = $props();
</script>

<span class="badge bg-{type}">{text}</span>
