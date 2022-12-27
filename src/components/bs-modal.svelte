<script>
    import 'bootstrap/scss/bootstrap.scss'
    const load = async () => {
        await import('bootstrap/dist/js/bootstrap.esm')
    }
    export let preButtonType;
    export let preButtonText
    export let icon;
    export let title
    export let body;
    export let confirmButtonType;
    export let confirmButtonText;
    export let confirmButtonAction
    export let closeButtonType;
    export let closeButtonText;
</script>

<!-- Button trigger modal -->
<button type="button" class="btn btn-{preButtonType}" data-bs-toggle="modal" data-bs-target="#exampleModal" on:mouseover={load} on:focus={load}>
    {preButtonText}
  </button>
  
  <!-- Modal -->
  <div class="modal fade dark:text-black" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <span>
            <img src={icon} alt="">
          </span>
          &nbsp;
          <span>
            <h1 class="modal-title fs-5" id="exampleModalLabel">{title}</h1>
          </span>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {body}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-{closeButtonType}" data-bs-dismiss="modal">{closeButtonText}</button>
          <button type="button" class="btn btn-{confirmButtonType}" on:click={confirmButtonAction}>{confirmButtonText}</button>
        </div>
      </div>
    </div>
  </div>
  