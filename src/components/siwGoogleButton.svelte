<script lang="ts">
import Auth from "../pages/login/auth.svelte";
</script>

<Auth
let:loggedIn
>

<div class="drop-shadow-md">
    {#if loggedIn}
    <a href="/login.html" class="btn btn-light">
            <span><p class="">View Account</p></span>
    </a>
    {:else if loggedIn == false}
        <a href="/login.html" class="btn btn-light">
            <span><p class="">Sign In</p></span>
        </a>
    {/if}
</div>

</Auth>


<style lang="scss">
    @import "../node_modules/bootstrap/scss/functions";
    $prefix: "dmv-ppio-";
    @import '../styles/scss/colorScheme.scss';
    @import "../node_modules/bootstrap/scss/variables";
    @import "../node_modules/bootstrap/scss/maps";
    @import "../node_modules/bootstrap/scss/mixins";
    @import "../node_modules/bootstrap/scss/root";
    @import "../../node_modules/bootstrap/scss/buttons";
</style>