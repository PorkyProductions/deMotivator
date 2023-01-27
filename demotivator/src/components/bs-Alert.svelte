<script>
    import 'bootstrap/scss/bootstrap.scss'
    export let type;
    export let icon;
    export let iconAlt;
    export let text;
    export let actionLink;
    export let actionText;
    const load = async () => {
      await import('bootstrap/dist/js/bootstrap.esm')
    }
    import { fade } from 'svelte/transition'
</script>

<div transition:fade class="alert alert-{type} d-flex align-items-center alert-dismissible" role="alert" on:mouseover={load} on:focus={load}>
    <span>
        <img src={icon} alt={iconAlt}>
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