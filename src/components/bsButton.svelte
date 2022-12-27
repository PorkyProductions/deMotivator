<script>
    import 'bootstrap/scss/bootstrap.scss'
    export let href;
    export let type;
    export let text;
    export let icon;
    export let iconAlt
</script>

<a href={href} class="btn btn-{type}"><img src={icon} alt={iconAlt}>&nbsp;{text}</a>

<style>
    img {
        display: inline;
    }
</style>