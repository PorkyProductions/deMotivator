<script lang="ts">
    import Title from '../../components/title.svelte';
    interface Credits {
        name: string,
        website: string,
        licenseName: string,
        licenseUrl: string
    }
    const credits: Credits[] = [
        {
            name: "Autoprefixer",
            website: "https://github.com/postcss/autoprefixer#readme",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/postcss/autoprefixer/main/LICENSE"
        },
        {
            name: "Bootstrap",
            website: "https://getbootstrap.com",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/twbs/bootstrap/main/LICENSE"
        },
        {
            name: "Bootstrap Icons",
            website: "https://icons.getbootstrap.com",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/twbs/icons/main/LICENSE.md"
        },
        {
            name: "Capacitor",
            website: "https://capacitorjs.com",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/ionic-team/capacitor/main/LICENSE"
        },
        {
            name: "(de)Motivator.js",
            website: "https://www.npmjs.com/package/demotivator",
            licenseName: "Apache-2.0",
            licenseUrl: "https://raw.githubusercontent.com/PorkyProductions/deMotivator.js/main/LICENSE"
        },
        {
            name: "ESLint",
            website: "https://eslint.org/",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/eslint/eslint/main/LICENSE"
        },
        {
            name: "PostCSS",
            website: "https://postcss.org/",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/postcss/postcss/main/LICENSE"
        },
        {
            name: "Sass",
            website: "https://sass-lang.com/",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/sass/dart-sass/main/LICENSE"
        },
        {
            name: "Serve",
            website: "https://github.com/vercel/serve#readme",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/vercel/serve/main/license.md"
        },
        {
            name: "Svelte",
            website: "https://svelte.dev",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/sveltejs/svelte/master/LICENSE.md"
        },
        {
            name: "TailwindCSS",
            website: "https://tailwindcss.com/",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/LICENSE"
        },
        {
            name: "Twemoji",
            website: "https://twemoji.twitter.com/",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/twitter/twemoji/master/LICENSE"
        },
        {
            name: "Twemoji Graphics",
            website: "https://twemoji.twitter.com/",
            licenseName: "CC-BY-4.0",
            licenseUrl: "https://raw.githubusercontent.com/twitter/twemoji/master/LICENSE-GRAPHICS"
        },
        {
            name: "TypeScript",
            website: "https://www.typescriptlang.org/",
            licenseName: "Apache-2.0",
            licenseUrl: "https://raw.githubusercontent.com/microsoft/TypeScript/main/LICENSE.txt"
        },
        {
            name: "UADetect",
            website: "https://porkyproductions.github.io/UA-detect/",
            licenseName: "Apache-2.0",
            licenseUrl: "https://raw.githubusercontent.com/PorkyProductions/UA-detect/mega/LICENSE"
        },
        {
            name: "Vite",
            website: "https://vitejs.dev",
            licenseName: "MIT",
            licenseUrl: "https://raw.githubusercontent.com/vitejs/vite/main/LICENSE"
        },
    ]
</script>

<div class="p-2 text-4xl">
    <div class="bg-gradient-to-tr from-indigo-400 via-primary-majorelleBlue to-blue-900 dark:from-orange-400 dark:via-secondary-orangePantone dark:to-orange-900 rounded-lg">
        <div class="text-white p-32">
            <Title />
        </div>
    </div>
</div>

<h2 class="font-primary text-4xl text-center">
    Credits
</h2>

<div class="">
    {#each credits as credit}
    <div class="pb-4 flex content-center justify-center">
        <span><a class="link link-primary" href={credit.website}>{credit.name}</a></span> &nbsp; <span> | </span> &nbsp;
        <span><a class="link link-info" href={credit.licenseUrl}>{credit.licenseName + " licensed"}</a></span>
    </div>
    {/each}
</div>