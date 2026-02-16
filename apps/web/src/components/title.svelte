
<script>
    import '../styles/css/app.css';
    import { name, PROD, version } from '../typescript/constants';
</script>
<a href="/" class="no-underline" id="link">
    <h1 class="font-primary text-center font-semibold" id="text">
        {name} {PROD ? '' : `(v${version})`}
    </h1>
</a>

<style>
    h1 {
        margin-bottom: 0;
        font-size: inherit;
        color: inherit;
    }
    #link {
        text-decoration: none;
    }
    #text {
        font-weight: 600;
    }
</style>
