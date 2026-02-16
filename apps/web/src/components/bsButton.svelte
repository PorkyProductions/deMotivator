<script lang="ts">
    import '../styles/scss/darkMode.scss';
    import type { BSVarient } from '../typescript/types';
    import Icon from './icon.svelte';
    const { href, type, text, icon }: { href: string; type: BSVarient; text: string; icon: string } = $props();
</script>

<a href={href} id="bsButton" class="btn btn-{type}"><Icon name={icon}/>{text}</a>
