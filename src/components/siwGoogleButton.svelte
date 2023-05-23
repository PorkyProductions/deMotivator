<script lang="ts">
import Auth from "../pages/login/auth.svelte";
import { darkMode } from "../utils/darkMode";
</script>

<Auth
let:loggedIn
>

<div class="drop-shadow-md">
    {#if darkMode}
        {#if loggedIn}
        <a href="/login.html" class="flex justify-between content-center bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg">
                <p class="text-sm lg:text-md leading-3 hover:text-white visited:text-purple-200 hover:visited:text-primary-majorelleBlue dark:hover:visited:text-secondary-orangePantone">View Account</p> &nbsp; <i class="bi bi-person-gear">
        </a>
        {:else if loggedIn == false}
            <a href="/login.html" class="flex justify-between content-center bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg">
                <p class="text-sm lg:text-md leading-3 hover:text-white visited:text-purple-200 hover:visited:text-primary-majorelleBlue dark:hover:visited:text-secondary-orangePantone">Sign In</p> &nbsp; <i class="bi bi-person-plus" >
            </a>
        {/if}
    {:else}
        {#if loggedIn}
        <a href="/login.html" class="flex justify-between content-center bg-white hover:bg-gray-200 text-black p-2 rounded-lg">
                <p class="text-sm lg:text-md leading-3 hover:text-gray-700 visited:text-purple-900 hover:visited:text-primary-majorelleBlue dark:hover:visited:text-secondary-orangePantone">View Account</p> &nbsp; <i class="bi bi-person-gear">
        </a>
        {:else if loggedIn == false}
            <a href="/login.html" class="flex justify-between content-center bg-white hover:bg-gray-200 text-black p-2 rounded-lg">
                <p class="text-sm lg:text-md leading-3 hover:text-gray-700 visited:text-purple-900 hover:visited:text-primary-majorelleBlue dark:hover:visited:text-secondary-orangePantone">Sign In</p> &nbsp; <i class="bi bi-person-plus">
            </a>
        {/if}
    {/if}
</div>

</Auth>