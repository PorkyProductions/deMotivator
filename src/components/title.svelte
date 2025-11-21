

<script>
    import '../styles/css/app.css'
    import { name, PROD, version } from '../typescript/constants';
</script>
<a href="/" class="no-underline" id="link">
    <h1 class="font-primary text-center title pt-5 pb-0 font-semibold" id="text">
        {name} {PROD ? "" : `(v${version})`}
    </h1>
</a>

<style>
    h1 {
        margin-bottom: 0;
    }
    #link {
        text-decoration: none;
    }
    #text {
        font-weight: 600;
    }
</style>