<script lang="ts">
    import 'bootstrap/scss/bootstrap.scss'
  import { BSVarient } from '../typescript/types';
    export let href: string;
    export let type: BSVarient;
    export let text: string;
    export let icon: string;
    export let iconAlt: string;
</script>

<a href={href} id="bsButton" class="btn btn-{type}"><img src={icon} alt={iconAlt}>&nbsp;{text}</a>

<style>
    img {
        display: inline;
    }
</style>