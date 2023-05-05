<script lang="ts">
  import '../styles/scss/darkMode.scss'
  import { BSVarient } from '../typescript/types';
    const load = async () => {
        await import('bootstrap/js/dist/modal')
    }
    export let preButtonType: BSVarient;
    export let preButtonText: string
    export let icon: string;
    export let title: string
    export let body: string;
    export let confirmButtonType: BSVarient;
    export let confirmButtonText: string;
    export let confirmButtonAction: any
    export let closeButtonType: BSVarient;
    export let closeButtonText: string;
</script>

<!-- Button trigger modal -->
<button type="button" class="btn btn-{preButtonType}" data-bs-toggle="modal" data-bs-target="#exampleModal" id="bsModal" on:mouseover={load} on:focus={load}>
    {preButtonText}
  </button>
  
  <!-- Modal -->
  <div class="modal fade dark:text-black" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <span>
            <i class="bi bi-{icon}">
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
  