<script>
import { Icon } from '@demotivator/ui-components';
import Title from '../../../components/title.svelte';
import { fade } from 'svelte/transition';
</script>

<div class="bg-linear-to-br from-danger-subtle to-body-tertiary py-5 px-4 mb-5" transition:fade>
<div class="container">
<div class="text-center">
<a href="/" class="text-decoration-none">
<span class="display-6 fw-bold text-body">
<Title />
</span>
</a>
<h1 class="display-4 fw-bold mt-3 mb-2">
<Icon name="chat-quote-fill" /> All Insults
</h1>
</div>
</div>
</div>
