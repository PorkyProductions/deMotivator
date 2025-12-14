<script lang="ts">
    import Title from '../../components/title.svelte';
    import Icon from '../../components/icon.svelte';
    import Footer from '../../components/footer.svelte';
    import { fade, fly, scale, blur } from 'svelte/transition';
    import { bsTheme } from '../../utils/darkMode';
    import confetti from 'canvas-confetti';
    import '../../styles/css/app.css';
    import '../../styles/scss/bootstrap.scss'
    import '../../styles/scss/colorScheme.scss'
    
    let lines = [
        "Hello there... yes, hello...",
        "The name's Bartholomew.",
        "Bartholomew J. Wickerson, actually.",
        "Well, technically it's Bartholomew Jeremiah Wickerson the Fourth...",
        "But my grandfather was also the Fourth, which doesn't make much sense when you think about it...",
        "You know how family naming conventions go...",
        "Actually, do you? I shouldn't assume...",
        "My friend Orville, he doesn't understand naming conventions at all.",
        "He once named his goldfish 'Tuesday'...",
        "But it was a Wednesday when he got it...",
        "I asked him about it, and he said...",
        "He said, 'Bartholomew, time is just a construct.'",
        "Which reminds me of that summer we spent trying to build a sundial...",
        "It was 1987... or was it 1988?",
        "No, definitely 1987 because that was the year of the great mayonnaise shortage...",
        "You probably don't remember the great mayonnaise shortage...",
        "Most people don't talk about it anymore...",
        "But back to why you're here...",
        "Oh yes, you're looking for a page that doesn't exist.",
        "404, they call it.",
        "You know, 404 is such an interesting number...",
        "It's divisible by 4, which makes it... well, divisible by 4.",
        "My nephew Eugene, he's really into numbers.",
        "He once told me that every number has a personality.",
        "404, according to Eugene, is melancholic but hopeful.",
        "I don't know what that means exactly...",
        "Eugene is strange like that.",
        "He also collects bottle caps.",
        "Not rare ones or anything, just... bottle caps.",
        "He has over 47,000 of them.",
        "Keeps them in his mother's basement.",
        "His mother, that's my sister Agatha...",
        "Agatha makes the most extraordinary lemon squares.",
        "But they're never actually square.",
        "More like... rhombuses? Rhombi?",
        "I never know the proper plural...",
        "Speaking of shapes, have you ever noticed how nothing is truly round?",
        "My friend Orville, the one with the goldfish...",
        "He has this theory about circles.",
        "He says if you zoom in enough, everything has edges.",
        "Infinite edges, but edges nonetheless.",
        "We argued about this for six hours once.",
        "It was at a Denny's.",
        "The waitress kept refilling our coffee.",
        "Her name was Meredith... or Margaret...",
        "It started with an M, I remember that much.",
        "She had this way of pouring coffee...",
        "Very deliberate, you know?",
        "Like each pour had meaning.",
        "That's when Orville started talking about his goldfish again.",
        "Tuesday had died by then.",
        "He got a new one and named it 'Eventually'.",
        "I said, 'Orville, that's not a name, that's an adverb.'",
        "He said, 'Everything is something, Bartholomew.'",
        "Which... I suppose is true?",
        "But it doesn't help with the goldfish naming situation.",
        "You know what else doesn't help?",
        "This error page situation you've found yourself in.",
        "But here's the thing about being lost...",
        "Sometimes it's exactly where you need to be.",
        "My uncle Mortimer got lost once.",
        "For seventeen years.",
        "Turned out he just moved to Toledo and forgot to tell anyone.",
        "We found him working at a lampshade factory.",
        "He seemed happy.",
        "Happier than when he was here, certainly.",
        "Here being... well, where is here exactly?",
        "In the digital sense, I mean.",
        "Are we in a server somewhere?",
        "Orville says servers are just fancy filing cabinets.",
        "But filing cabinets don't need cooling systems.",
        "I worked in an office once that had filing cabinets.",
        "Alphabetical order is surprisingly controversial.",
        "Does 'The' count? What about 'A' or 'An'?",
        "These are the questions that keep me up at night.",
        "Well, that and my neighbor's rooster.",
        "He got it illegally, I'm sure.",
        "You're not supposed to have roosters in the suburbs.",
        "But Gerald - that's my neighbor, not the rooster...",
        "The rooster's name is Chairman Clucks.",
        "Gerald says it's an emotional support rooster.",
        "I didn't know that was a thing.",
        "Apparently, a lot of things are things now.",
        "My cousin Bethany has an emotional support cactus.",
        "It's plastic.",
        "I pointed this out once.",
        "She said, 'That's what makes it supportive, Bartholomew.'",
        "I didn't pursue the matter further.",
        "You learn to pick your battles.",
        "Speaking of battles...",
        "No, wait, we weren't speaking of battles.",
        "I was going to segue into something about war...",
        "But that seems heavy for a 404 page.",
        "Let's talk about sandwiches instead.",
        "I was eating a sandwich earlier.",
        "Pastrami on rye with mustard.",
        "The mustard was a bit aggressive.",
        "Do you ever feel like condiments have personalities?",
        "Mustard is definitely aggressive.",
        "Mayonnaise is complacent.",
        "Ketchup is trying too hard to be liked.",
        "Hot sauce is... well, hot sauce knows what it is.",
        "I respect hot sauce.",
        "Orville doesn't eat hot sauce.",
        "He says it masks the true flavor of food.",
        "But sometimes food's true flavor needs masking.",
        "Like my aunt Gertrude's tuna casserole.",
        "She puts raisins in it.",
        "Raisins!",
        "In tuna casserole!",
        "She says it adds sweetness.",
        "I say it adds confusion.",
        "But I eat it anyway when I visit.",
        "You do things for family.",
        "Family is important.",
        "More important than finding the right webpage, certainly.",
        "Although, you did come here looking for something specific...",
        "And instead you found me.",
        "Bartholomew.",
        "Still here, still talking.",
        "I should probably apologize for that.",
        "But I won't.",
        "Because maybe this is better than what you were looking for.",
        "Or maybe not.",
        "Probably not, actually.",
        "Most people prefer finding what they're looking for.",
        "It's human nature.",
        "Or is it?",
        "My philosophy professor, Dr. Hendricks...",
        "He used to say human nature was a myth.",
        "Then he'd eat the same bologna sandwich every day.",
        "Same brand, same mustard, same everything.",
        "If that's not human nature, I don't know what is.",
        "Actually, I don't know what human nature is.",
        "Nobody really does.",
        "We just pretend we do.",
        "Like how we pretend to enjoy small talk.",
        "Speaking of weather...",
        "Wait, we weren't speaking of weather.",
        "But people always do, don't they?",
        "'Nice weather we're having.'",
        "'Bit cold for this time of year.'",
        "'Hot enough for you?'",
        "That last one particularly bothers me.",
        "What am I supposed to say? 'No, I prefer it hotter'?",
        "Nobody prefers it hotter.",
        "Except maybe my friend Orville.",
        "He keeps his house at 81 degrees.",
        "Year-round.",
        "Says it reminds him of the womb.",
        "I didn't ask whose womb.",
        "Some questions are better left unasked.",
        "Like why you're still reading this.",
        "Are you still there?",
        "Hello?",
        "I'll assume you are.",
        "It's nice having company.",
        "Even if it's one-sided company.",
        "Everything's one-sided when you think about it.",
        "Even two-sided things are just two one-sides.",
        "My friend Orville would disagree.",
        "He believes in the concept of true two-sidedness.",
        "We've discussed this at length.",
        "Usually at that same Denny's.",
        "Meredith... or Margaret... doesn't work there anymore.",
        "Now it's a guy named Kyle.",
        "He doesn't pour coffee with the same intention.",
        "Very splash-happy, that Kyle.",
        "Gets it on the saucer every time.",
        "The saucer serves no purpose now.",
        "Just a coffee-stained circle of ceramic sadness.",
        "That's poetry, right there.",
        "I wrote poetry once.",
        "It was about pigeons.",
        "Urban pigeons specifically.",
        "How they're just rock doves that forgot how to be wild.",
        "My English teacher said it was 'derivative'.",
        "I said, 'Aren't we all?'",
        "She gave me a C+.",
        "The plus felt sarcastic.",
        "You know what else feels sarcastic?",
        "This entire situation.",
        "You, looking for a webpage.",
        "Me, existing in the absence of that webpage.",
        "It's almost philosophical.",
        "If a webpage fails to load and no one's there to see it...",
        "No, wait, you ARE here to see it.",
        "So it definitely failed.",
        "That's less philosophical.",
        "More just... disappointing.",
        "Like my cousin Jeremy's magic shows.",
        "He's not a magician.",
        "He just owns a top hat and refuses to accept reality.",
        "The rabbit died years ago.",
        "Now he pulls out a stuffed ferret.",
        "Says it's 'avant-garde'.",
        "The children at birthday parties don't buy it.",
        "Children are surprisingly harsh critics.",
        "My niece Rebecca once told me my haircut made me look like a disappointed thumb.",
        "She was four.",
        "I changed my haircut.",
        "Not because of Rebecca...",
        "Well, entirely because of Rebecca.",
        "Four-year-olds have no filter.",
        "Neither does my coffee maker.",
        "I mean, it has one, I just never change it.",
        "Coffee tastes the same to me either way.",
        "Orville says I have an 'unrefined palate'.",
        "This from a man who puts ketchup on eggs.",
        "Not just scrambled eggs.",
        "All eggs.",
        "Poached, fried, boiled...",
        "Even eggs Benedict.",
        "The hollandaise and ketchup combination...",
        "It haunts me.",
        "Some things shouldn't exist.",
        "Like this error page.",
        "Yet here we are.",
        "You and me.",
        "Well, mostly me talking.",
        "You're very patient.",
        "Or you've left already.",
        "If you've left, I'm talking to myself.",
        "Which isn't unusual, honestly.",
        "I have great conversations with myself.",
        "I always agree with me.",
        "Except when I don't.",
        "Which is more often than you'd think.",
        "Or exactly as often as you'd think.",
        "I don't know what you think.",
        "Do you think?",
        "Of course you think.",
        "Unless you're a bot.",
        "Are you a bot?",
        "Bots probably don't get 404 errors.",
        "They expect them.",
        "Must be nice to expect disappointment.",
        "Then it's not really disappointment, is it?",
        "It's just... appointment?",
        "That doesn't sound right.",
        "Nothing sounds right anymore.",
        "Especially my neighbor's rooster.",
        "Chairman Clucks has no concept of time.",
        "3 AM, 3 PM, doesn't matter.",
        "Gerald says it's expressing itself.",
        "I say it's expressing MY insomnia.",
        "But who am I to judge?",
        "I'm just Bartholomew.",
        "Stuck in this 404 error.",
        "Talking to possibly no one.",
        "About nothing in particular.",
        "For far too long.",
        "...",
        "...",
        "You know what? I forgot what I was talking about.",
        "Oh yes, the webpage that doesn't exist.",
        "It's still not existing, by the way.",
        "In case you were wondering.",
        "Probably weren't.",
        "Most people have moved on by now.",
        "Not you though.",
        "You're special.",
        "Or stubborn.",
        "Or both.",
        "Like my friend Orville's goldfish.",
        "The third one, not Tuesday or Eventually.",
        "This one's named 'Pending'.",
        "Still alive, surprisingly.",
        "Going on three years now.",
        "That's like... I don't know, a lot in goldfish years.",
        "Do goldfish have years?",
        "Or do they experience time differently?",
        "Orville thinks they live in an eternal present.",
        "No past, no future, just... now.",
        "Must be nice.",
        "Or terrifying.",
        "Probably both.",
        "Like this conversation.",
        "Is this a conversation?",
        "It feels more like a monologue.",
        "A very long monologue.",
        "About nothing.",
        "And everything.",
        "But mostly nothing.",
        "My drama teacher said I had a gift for monologues.",
        "She also said I had no sense of timing.",
        "Both things can be true.",
        "Are being true.",
        "Right now.",
        "As I continue talking.",
        "And talking...",
        "And talking...",
        "...",
        "You know, I should probably let you go.",
        "Find what you were actually looking for.",
        "Or not.",
        "Your choice.",
        "Everything's a choice when you think about it.",
        "Except genetics.",
        "And weather.",
        "And my neighbor's rooster.",
        "Chairman Clucks chooses for all of us.",
        "What was I saying?",
        "Oh right, goodbye.",
        "Or not goodbye.",
        "More like... see you later?",
        "Except I won't see you.",
        "And there might not be a later.",
        "So just...",
        "...",
        "End.",
        "The end.",
        "Finale.",
        "Fin.",
        "...",
        "THE END"
    ];
    
    // State management
    let currentLineIndex = $state(0);
    let showStarted = $state(false);
    let linkVisible = $state(false);
    let storyComplete = $state(false);
    let userInteracted = $state(false);
    let messageSpeed = $state(3000);
    let paused = $state(false);
    let autoplayInterval: any;
    
    // Computed values
    const currentLine = $derived(lines[currentLineIndex] || "");
    const progress = $derived(((currentLineIndex + 1) / lines.length) * 100);
    const isEmoticon = $derived(currentLine.includes('🤯') || currentLine.includes('💔'));
    const isAction = $derived(currentLine.startsWith('*') && currentLine.endsWith('*'));
    
    // Story controls
    const startStory = () => {
        showStarted = true;
        userInteracted = true;
        autoplayInterval = setInterval(nextLine, messageSpeed);
        
        // Small confetti for starting
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#ff6b6b', '#4ecdc4', '#45b7d1']
        });
    };
    
    const nextLine = () => {
        if (!paused && currentLineIndex < lines.length - 1) {
            currentLineIndex++;
            
            // Check for special moments
            if (currentLine === "YAY!") {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            
            if (currentLineIndex === lines.length - 1) {
                storyComplete = true;
                linkVisible = true;
                clearInterval(autoplayInterval);
            }
        }
    };
    
    const previousLine = () => {
        if (currentLineIndex > 0) {
            currentLineIndex--;
        }
    };
    
    const togglePause = () => {
        paused = !paused;
    };
    
    const restartStory = () => {
        currentLineIndex = 0;
        storyComplete = false;
        linkVisible = false;
        paused = false;
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextLine, messageSpeed);
    };
    
    const skipToEnd = () => {
        currentLineIndex = lines.length - 1;
        storyComplete = true;
        linkVisible = true;
        clearInterval(autoplayInterval);
    };
    
    // Cleanup
    $effect(() => {
        return () => {
            if (autoplayInterval) clearInterval(autoplayInterval);
        };
    });
    
    // Fun error messages for the initial state
    const errorMessages = [
        "page aint here lol",
        "looks like you took a wrong turn",
        "this is not the page you're looking for",
        "oops! we can't find that page",
        "404 error: page missing in action",

    ];
    
    const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen bg-body">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-warning-subtle via-danger-subtle to-body-tertiary py-5 px-4" transition:fade>
        <div class="container">
            <div class="text-center">
                <a href="/" class="text-decoration-none">
                    <Title />
                </a>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-xl-6">
                {#if !showStarted}
                    <!-- Initial 404 State -->
                    <div transition:scale class="text-center mb-5">
                        <!-- Animated 404 Display -->
                        <div class="position-relative d-inline-block mb-4">
                            <h1 class="display-1 fw-bold text-danger mb-0" style="font-size: 10rem; line-height: 1;">
                                4<span class="text-warning">0</span>4
                            </h1>
                            <div class="position-absolute top-50 start-50 translate-middle">
                                <div class="spinner-grow text-warning opacity-25" style="width: 8rem; height: 8rem;" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                        
                        <h2 class="h3 fw-bold mb-3">Page Not Found</h2>
                        <p class="lead text-secondary mb-4">{randomErrorMessage}</p>
                        
                        <!-- Error Details Card -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <Icon name="exclamation-triangle" /> What happened?
                                </h5>
                                <p class="card-text text-muted">
                                    At this point it could be anything, but we're suspecting it's your fault. 
                                    Look, there's something interesting below. Maybe try it and see what happens.
                                </p>
                                <div class="list-group list-group-flush mt-3">
                                    <div class="list-group-item bg-transparent">
                                        <Icon name="link-45deg" /> You may have typed the URL incorrectly
                                    </div>
                                    <div class="list-group-item bg-transparent">
                                        <Icon name="bookmark-x" /> The page may have been moved or deleted
                                    </div>
                                    <div class="list-group-item bg-transparent">
                                        <Icon name="wifi-off" /> There might be a temporary issue
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Interactive Element -->
                        <div class="card border-danger shadow-lg" transition:fly={{ y: 20, delay: 300 }}>
                            <div class="card-body text-center py-4">
                                <p class="text-danger fw-bold mb-3">
                                    <Icon name="hand-index-thumb" /> you might wanna click this
                                </p>
                                <div class="form-check form-switch d-inline-block">
                                    <input 
                                        class="form-check-input fs-1" 
                                        type="checkbox" 
                                        role="switch" 
                                        id="mysterySwitch"
                                        bind:checked={showStarted}
                                        onchange={startStory}
                                        style="width: 4rem; height: 2rem; cursor: pointer;"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                {:else}
                    <!-- Story Mode -->
                    <div transition:fade class="mb-5">
                        <!-- Story Progress -->
                        <div class="card border-0 shadow-sm mb-3">
                            <div class="card-body p-2">
                                <div class="progress" style="height: 4px;">
                                    <div 
                                        class="progress-bar bg-gradient" 
                                        role="progressbar" 
                                        style={`width: ${progress}%`}
                                        aria-valuenow={progress} 
                                        aria-valuemin="0" 
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Story Display -->
                        <div class="card border-0 shadow-lg mb-4" style="min-height: 300px;">
                            <div class="card-body d-flex align-items-center justify-content-center p-5">
                                <div class="text-center w-100">
                                    {#if isEmoticon}
                                        <div transition:scale class="display-1 mb-3">
                                            {currentLine}
                                        </div>
                                    {:else if isAction}
                                        <div transition:blur class="fst-italic text-secondary fs-4">
                                            {currentLine}
                                        </div>
                                    {:else if currentLine === "YAY!"}
                                        <div transition:scale class="display-3 fw-bold text-success">
                                            {currentLine}
                                        </div>
                                    {:else if currentLine.includes("💔")}
                                        <div transition:scale class="display-3 text-danger">
                                            {currentLine}
                                        </div>
                                    {:else if currentLine === "THE END"}
                                        <div transition:scale class="display-4 fw-bold text-primary">
                                            {currentLine}
                                        </div>
                                    {:else}
                                        <div transition:fly={{ y: 10 }} class="fs-3 lh-base">
                                            {currentLine}
                                        </div>
                                    {/if}
                                    
                                    {#if currentLine === "The name's Bartholomew."}
                                        <div transition:fade={{ delay: 500 }} class="mt-3">
                                            <img 
                                                src={`https://tse2.mm.bing.net/th/id/OIP.Y3M6jxNvPLX-JTYyOD7KtgHaFf?rs=1&pid=ImgDetMain&o=7&rm=3`}
                                                alt="Bartholomew" 
                                                class="rounded-circle"
                                                style="width: 100px; height: 100px;"
                                            />
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Story Controls -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group" role="group">
                                        <button 
                                            class="btn btn-outline-secondary"
                                            onclick={previousLine}
                                            disabled={currentLineIndex === 0}
                                        >
                                            <Icon name="skip-backward" />
                                        </button>
                                        <button 
                                            class="btn btn-outline-primary"
                                            onclick={togglePause}
                                        >
                                            {#if paused}
                                                <Icon name="play-fill" /> Play
                                            {:else}
                                                <Icon name="pause-fill" /> Pause
                                            {/if}
                                        </button>
                                        <button 
                                            class="btn btn-outline-secondary"
                                            onclick={nextLine}
                                            disabled={currentLineIndex >= lines.length - 1}
                                        >
                                            <Icon name="skip-forward" />
                                        </button>
                                    </div>
                                    
                                    <div class="text-muted small">
                                        {currentLineIndex + 1} / {lines.length}
                                    </div>
                                    
                                    <div class="btn-group" role="group">
                                        <button 
                                            class="btn btn-outline-warning btn-sm"
                                            onclick={restartStory}
                                        >
                                            <Icon name="arrow-clockwise" /> Restart
                                        </button>
                                        {#if !storyComplete}
                                            <button 
                                                class="btn btn-outline-danger btn-sm"
                                                onclick={skipToEnd}
                                            >
                                                <Icon name="fast-forward" /> Skip
                                            </button>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Story Complete Actions -->
                        {#if storyComplete}
                            <div transition:fly={{ y: 20 }} class="card border-0 shadow-lg bg-primary bg-opacity-10">
                                <div class="card-body text-center py-4">
                                    <h3 class="card-title fw-bold">The End</h3>
                                    <p class="card-text mb-3">
                                        Thanks for staying until the end! Bartholomew appreciates it.
                                    </p>
                                    <div class="d-flex gap-3 justify-content-center">
                                        <a href="/" class="btn btn-primary btn-lg shadow-sm">
                                            <Icon name="house-door" /> Go Home
                                        </a>
                                        <button class="btn btn-outline-primary btn-lg" onclick={restartStory}>
                                            <Icon name="arrow-clockwise" /> Read Again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}
                
                <!-- Navigation Options (Always visible) -->
                {#if !userInteracted || storyComplete}
                    <div class="text-center" transition:fade>
                        <hr class="my-4" />
                        <h5 class="text-muted mb-3">Lost? Here are some helpful links:</h5>
                        <div class="d-flex gap-2 justify-content-center flex-wrap">
                            <a href="/" class="btn btn-outline-secondary">
                                <Icon name="house" /> Home
                            </a>
                            <a href="/login.html" class="btn btn-outline-secondary">
                                <Icon name="person" /> Account
                            </a>
                            <a href="/leaderboard.html" class="btn btn-outline-secondary">
                                <Icon name="trophy" /> Leaderboard
                            </a>
                            <a href="/list.html" class="btn btn-outline-secondary">
                                <Icon name="list-ul" /> All Insults
                            </a>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    :global(body), :global(html) {
        height: 100%;
        margin: 0;
    }
    
    /* Smooth animations */
    :global(.progress-bar) {
        transition: width 0.5s ease;
    }
    
    /* Large switch styling */
    :global(.form-switch .form-check-input:checked) {
        background-color: #dc3545;
        border-color: #dc3545;
    }
    
    /* Glowing effect for mystery switch */
    :global(.form-check-input:hover) {
        box-shadow: 0 0 20px rgba(220, 53, 69, 0.5);
    }
    
    /* Text animations */
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    :global(.display-3) {
        animation: pulse 2s infinite;
    }
</style>