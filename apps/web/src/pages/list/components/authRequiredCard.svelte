<script lang="ts">
import { Icon } from '@demotivator/ui';
import AuthBenefitsDialog from '../../../components/authBenefitsDialog.svelte';
import { scale } from 'svelte/transition';
</script>

<div class="container">
<div class="row justify-content-center">
<div class="col-lg-6">
<div class="card border-0 shadow-lg" transition:scale>
<div class="card-body text-center py-5">
<div class="text-danger mb-4 text-4xl">
<Icon name="lock-fill" />
</div>
<h2 class="card-title fw-bold mb-3">Authentication Required</h2>
<p class="card-text text-muted mb-4">
You must be logged in to view the complete insult collection.
Create an account or sign in to access all features.
</p>
<div class="d-flex gap-3 justify-content-center">
<a href="/login.html" class="btn btn-primary btn-lg shadow-sm">
<Icon name="box-arrow-in-right" /> Sign In
</a>
<a href="/signUp.html" class="btn btn-outline-primary btn-lg">
<Icon name="person-plus" /> Create Account
</a>
</div>
<div class="mt-4 d-flex justify-content-center">
<AuthBenefitsDialog
modalId="listBenefitsDialog"
buttonClass="btn btn-outline-info"
/>
</div>
</div>
</div>
</div>
</div>
</div>
