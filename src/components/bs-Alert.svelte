<script lang="ts">
    import '../styles/scss/darkMode.scss' 
    import { type BSVarient } from '../typescript/types';
    export let type: BSVarient;
    export let icon: string;
    export let text: string;
    export let actionLink: string;
    export let actionText: string;
    const load = async () => {
      await import('bootstrap/js/dist/alert')
    }
    import { fade } from 'svelte/transition'
  import Icon from './icon.svelte';
</script>

<div transition:fade class="alert alert-{type} d-flex align-items-center alert-dismissible" role="alert" on:mouseover={load} on:focus={load}>
    <span>
        <Icon name={icon} />
    </span>
      &nbsp;
    <span>
      {text}
    </span>
    &nbsp;
    <span>
      <a class="alert-link" href={actionLink}>{actionText}</a>      
    </span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>