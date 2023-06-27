<script lang="ts">
    import Auth from "../pages/login/auth.svelte";
    import { darkMode } from "../utils/darkMode";
    import Icon from "./icon.svelte";
    import '../styles/scss/buttonsBootstrap.scss'
</script>

<Auth
let:loggedIn
>

<div class="drop-shadow-md">
    {#if loggedIn}
    <a href="/login.html" class={!darkMode ? "btn btn-light" : "btn btn-dark"}>
            <span><p class=""><Icon name="person-gear" />View Account</p></span>
    </a>
    {:else if loggedIn == false}
        <a href="/login.html" class={!darkMode ? "btn btn-light" : "btn btn-dark"}>
            <span><p class=""><Icon name="person-plus" />Sign In</p></span>
        </a>
    {/if}
</div>

</Auth>