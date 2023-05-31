<script>
    import Twitter from "./twitter.svelte";
    import { tweets } from './tweets.ts'
    import Title from "../../components/title.svelte";
    import { bsTheme } from "../../utils/darkMode";
    let sendButtonClasses = "btn btn-primary"
    let emailBoxContent;
</script>

<div id="root" data-bs-theme={bsTheme}>
    <div class="p-2 text-4xl">
    <div class="bg-gradient-to-tr from-indigo-400 via-primary-majorelleBlue to-blue-900 dark:from-orange-400 dark:via-secondary-orangePantone dark:to-orange-900 rounded-lg">
        <div class="text-white p-32">
            <Title />
        </div>
    </div>
</div>

<h2 class="font-primary text-4xl text-center p-4">
    Share
</h2>
<div class="p-4">
    <div class="font-primary text-2xl text-center p-4">
        Share on Twitter
    </div>
    <div class="flex content-center justify-center">
        <Twitter />
    </div>
</div>

<hr>

<div class="p-4 flex content-center justify-center">
    <div class="font-primary text-2xl text-center">
        Email it to your friends! &nbsp;
    </div>
    <label for="emailTo" class="form-label"></label>
    <input type="email" name="emailTo" id="EmailTo" class="input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text" bind:value={emailBoxContent}> &nbsp;
</div>
<div class="flex content-center justify-center pb-3">
    <a href="mailto:{emailBoxContent}?subject=I have found the holy grail of websites&body={tweets[Math.floor(Math.random() * tweets.length)]}" class={sendButtonClasses} on:click={() => sendButtonClasses = "btn btn-success"}>Send!</a>
</div>


<hr>

</div>