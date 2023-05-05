<script>
    import Title from './title.svelte';
    import { insultAt, createArray } from 'demotivator';
    import { randomInRange } from '../utils/random';
    import { parentCompany } from '../typescript/constants';
    var year = new Date().getFullYear().toLocaleString("en-US")
</script>



<div class="flex justify-between dark:bg-theme-black bg-primary-majorelleBlue">
    <div class="text-white">
            <Title />
    </div>
    <div class="text-white font-primary text-center p-5 font-normal">
        {
            insultAt(
                randomInRange(
                    1,
                    300
                ),
                createArray(
                    {
                        original: true, 
                        profane: false
                    }
                )
            )
        }
    </div>
</div>
<div class="flex justify-center font-primary dark:bg-theme-black bg-primary-majorelleBlue">
     <span>
            <p class="text-white">Copyright &copy; 2020-{year}. A {parentCompany} product</p>
    </span>
</div>