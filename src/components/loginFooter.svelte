<script>
    import Title from './title.svelte';
    import 'bootstrap/scss/bootstrap.scss'
    import { insultAt } from 'demotivator';
    import { randomInRange } from '../typescript/random';
    var year = new Date().getFullYear()
</script>



<div class="flex justify-between dark:bg-theme-black bg-primary-majorelleBlue">
    <div class="text-white">
            <Title />
    </div>
    <div class="text-white font-primary text-center p-5 font-normal">
        {insultAt(randomInRange(1,300))}
    </div>
</div>
<div class="flex justify-center font-primary dark:bg-theme-black bg-primary-majorelleBlue">
     <span>
            <p class="text-white">Copyright &copy; 2020-{year}. A PorkyProductions product</p>
    </span>
</div>