<script lang="ts">
    import '../styles/scss/darkMode.scss'
    import type { BSVarient } from '../typescript/types';
    export let type: BSVarient;
    export let text: string;
</script>

<span class="badge bg-{type}">{text}</span>
