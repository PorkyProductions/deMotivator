

<script>
    import '../styles/css/app.css'
    import { name, PROD, version } from '../typescript/constants';
</script>

<h1 class="font-primary text-center title p-5 font-semibold">
    {name} {PROD ? "" : `(v${version})`}
</h1>

<style>
    h1 {
        margin-bottom: 0;
    }
</style>