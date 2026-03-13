<script>
	import { isEmailValid, isPwValid } from '../utils/regEx';
	import { getValidationClass } from '../utils/loginValidation';
	import { Icon } from '@demotivator/ui';
	import ForgotPasswordDialog from './forgotPasswordDialog.svelte';

	let {
		emailBoxContent = $bindable(''),
		pwText = $bindable(''),
		emailInvalid = $bindable(false),
		pwInvalid = $bindable(false),
		keepMeLoggedIn = $bindable(false),
		onSubmit,
		loginWithGoogle
	} = $props();

	const onChangeLoginText = () => {
		pwInvalid = !isPwValid(pwText);
		emailInvalid = !isEmailValid(emailBoxContent);
	};
</script>

<div class="mx-auto w-100" style="max-width: 480px;">
	<div class="mb-5">
		<h1 class="fw-bold mb-2">Welcome back</h1>
		<p class="text-secondary lead">Enter your details to access your account.</p>
	</div>

	<form onsubmit={onSubmit} class="d-flex flex-column gap-3">
		<div>
			<label class="form-label fw-semibold" for="email">Email Address</label>
			<div class="input-group has-validation">
				<input
					class={`form-control form-control-lg ${getValidationClass(emailBoxContent, emailInvalid)}`}
					id="email"
					type="email"
					placeholder="you@example.com"
					bind:value={emailBoxContent}
					onchange={onChangeLoginText}
					oninput={onChangeLoginText}
					required
				/>
				{#if emailInvalid && emailBoxContent}
					<div class="invalid-feedback d-block">
						Please enter a valid email address.
					</div>
				{/if}
			</div>
		</div>

		<div>
			<div class="d-flex justify-content-between align-items-center mb-1">
				<label class="form-label fw-semibold mb-0" for="password">Password</label>
				<ForgotPasswordDialog modalId="forgotPasswordModal" linkClass="text-primary text-decoration-none small fw-semibold" />
			</div>
			<div class="input-group has-validation">
				<input
					class={`form-control form-control-lg ${getValidationClass(pwText, pwInvalid)}`}
					id="password"
					type="password"
					placeholder="••••••••••••"
					required
					bind:value={pwText}
					onchange={onChangeLoginText}
					oninput={onChangeLoginText}
				/>
				{#if pwInvalid && pwText.length > 0}
					<div class="invalid-feedback d-block">
						Password requirements not met.
					</div>
				{/if}
			</div>
		</div>

		<div class="form-check my-2">
			<input class="form-check-input" type="checkbox" id="keepLoggedIn" bind:checked={keepMeLoggedIn}>
			<label class="form-check-label text-secondary" for="keepLoggedIn">Keep me logged in</label>
		</div>

		<div class="d-grid gap-3 mt-3">
			<button type="submit" class="btn btn-primary btn-lg shadow-sm">
				<Icon name="person-plus" /> Sign In
			</button>
			<button type="button" onclick={loginWithGoogle} class="btn btn-outline-secondary btn-lg bg-body text-body">
				<Icon name="google" /> &nbsp; Sign in with Google
			</button>
		</div>
	</form>

	<div class="mt-5 text-center">
		<p class="text-secondary">
			Don't have an account? <a href="signUp.html" class="fw-bold text-primary text-decoration-none">Create one</a>
		</p>
	</div>
</div>
