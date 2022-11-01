<script>
    import Title from '../../components/title.svelte';
    import { fade } from 'svelte/transition';
    import '../../styles/css/app.css'
    import '../../styles/css/customProps.css'
    import '../../styles/scss/colorScheme.scss'
    import '../../styles/scss/spin.scss'
    let lines = [
        "HEY! Who pressed that???",
        "It's been a long time since anyone has been here, partner",
        "the name's Bartholomew.",
        "What brings you to this part of town?",
        "Wrong navigation, I see.",
        "Well, that error code up there means that the page you were looking for could not be found",
        "This could have a multitude of reasons, such as",
        "You entered the wrong URL",
        "You followed a wrong link",
        "Or your energy is not boding well for the device you're using right now.",
        "You know, you could have just as easily left the page right now",
        "Yet you decided to stay",
        "that must mean you like me",
        "did we just fall in love??",
        "🤯",
        "🤯🤯",
        "🤯🤯🤯",
        "...",
        "want to...",
        "i was wondering...",
        "did you want to...",
        "did you maybe want to go on a date?",
        "please dont say no",
        "Really?????",
        "Do you really mean it???",
        "YAY!",
        "wait...",
        "once you leave this page...",
        "i'm gonna disappear",
        "and so will our love",
        "💔",
        "well in the meantime...",
        "im eating a turkey sandwich right now",
        "whats that?? you dont like turkey??",
        "oh...ok",
        "*throws sandwich behind him*",
        "*clunk*",
        "*cat screams and jumps onto ground, running away*",
        "him?? oh thats my cat Leonard Benard Henry Wallace Thomas Anthony Williams, III",
        "hes a little rascal",
        "he likes to eat my rubber band collection",
        "then he starts yakking and i have to bring him to the vet to get it removed from his stomach",
        "then i put them back where they were and he finds them again and then eats them again and the cycle repeats",
        "sometimes i like to bring him out on picnics",
        "on days where the tempature is above 70 degrees, and its about to be twilight, but like without all the vampires",
        "he likes to drink lemonade",
        "so i usually make him a country time lemonade mix and he drinks it all just like the good cat he is",
        "anyway i gotta be going",
        "it was nice meeting you",
        "tata",
        "goodbye",
        "so long",
        "aloha",
        "mahalo",
        "bonsoir",
        " "
    ]
    let currentLine = lines[0];
    let showStarted = false
    let linkVisible = false
    setInterval(() => currentLine = lines.shift(), 3000);
    setTimeout(() => linkVisible = true, 36000)
</script>
<div class="text-black dark:bg-black dark:text-white m-auto">
    <Title />
    <h1 class="text-center font-primary font-bold text-xl lg:text-9xl">
        404
    </h1>
    {#if !showStarted}
        <div transition:fade>
            <p class="title text-center font-primary p-4">
                At this point it could be anything, but we're suspecting its your fault. Look, theres a button below. Maybe try pressing it and see what happens.
            </p>
            <div class="flex content-center justify-center">
                <input type="checkbox" bind:checked={showStarted}> <span class="font-primary"> &leftarrow; &nbsp; Maybe Try This</span>
            </div>
        </div>
    {:else}
        <p transition:fade class="title text-center font-primary p-4">
            {currentLine}
        </p>
        {#if linkVisible}
        <div transition:fade class="flex content-center justify-center">
            <a class="text-blue-500 underline" href="index.html">go back home</a>
        </div>
        {/if}
    {/if}
</div>