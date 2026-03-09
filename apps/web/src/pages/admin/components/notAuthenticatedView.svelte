<script lang="ts">
import { fly } from 'svelte/transition';
import { Icon } from '@demotivator/ui';
import AuthBenefitsDialog from '../../../components/authBenefitsDialog.svelte';
</script>

<div class="container py-5">
<div class="row justify-content-center">
<div class="col-lg-6">
<div class="card border-0 shadow-lg" transition:fly={{ y: 20 }}>
<div class="card-body text-center py-5">
<div class="text-danger mb-4 text-4xl">
<Icon name="shield-lock-fill"/>
</div>
<h2 class="card-title fw-bold mb-3">Access Denied</h2>
<p class="card-text text-muted mb-4">
You must be signed in to access this page.
</p>
<div class="d-flex gap-3 justify-content-center">
<a href="/login.html" class="btn btn-primary btn-lg shadow-sm">
<Icon name="box-arrow-in-right" /> Sign In
</a>
<a href="/" class="btn btn-outline-primary btn-lg">
<Icon name="house-door-fill" /> Go Home
</a>
</div>
<div class="mt-4 d-flex justify-content-center">
<AuthBenefitsDialog
modalId="adminBenefitsDialog"
buttonClass="btn btn-outline-info"
/>
</div>
</div>
</div>
</div>
</div>
</div>
