<script lang="ts">
    import 'bootstrap/scss/bootstrap.scss'
    import { BSVarient } from '../typescript/types';
    export let type: BSVarient;
    export let text: string;
</script>

<span class="badge bg-{type}">{text}</span>
