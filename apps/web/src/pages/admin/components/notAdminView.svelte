<script lang="ts">
import { fly } from 'svelte/transition';
import { Icon } from '@demotivator/ui-components';
</script>

<div class="container py-5">
<div class="row justify-content-center">
<div class="col-lg-6">
<div class="card border-0 shadow-lg" transition:fly={{ y: 20 }}>
<div class="card-body text-center py-5">
<div class="text-warning mb-4 text-4xl">
<Icon name="exclamation-triangle-fill"/>
</div>
<h2 class="card-title fw-bold mb-3">Access Denied</h2>
<p class="card-text text-muted mb-4">
You do not have administrator privileges to access this page.
</p>
<div class="d-flex gap-3 justify-content-center">
<a href="/" class="btn btn-primary btn-lg shadow-sm">
<Icon name="house-door-fill" /> Go Home
</a>
<a href="/account.html" class="btn btn-outline-primary btn-lg">
<Icon name="person-circle" /> My Account
</a>
</div>
</div>
</div>
</div>
</div>
</div>
