<script lang="ts">
    import '../styles/scss/darkMode.scss'
    import { BSVarient } from '../typescript/types';
    export let href: string;
    export let type: BSVarient;
    export let text: string;
    export let icon: string;
</script>

<a href={href} id="bsButton" class="btn btn-{type}"><i class="bi bi-{icon}">&nbsp;{text}</a>

    <style>
        i {
            font-style: normal;
        }
    </style>