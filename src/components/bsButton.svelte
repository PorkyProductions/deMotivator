<script lang="ts">
    import '../styles/scss/darkMode.scss'
    import { BSVarient } from '../typescript/types';
    import Icon from './icon.svelte';
    export let href: string;
    export let type: BSVarient;
    export let text: string;
    export let icon: string;
</script>

<a href={href} id="bsButton" class="btn btn-{type}"><Icon name={icon}/>{text}</a>