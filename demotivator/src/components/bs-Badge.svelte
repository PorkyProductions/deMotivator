<script lang="ts">
    import 'bootstrap/scss/bootstrap.scss'
    export let type: string;
    export let text: string;
</script>

<span class="badge bg-{type}">{text}</span>
