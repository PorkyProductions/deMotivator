<script lang="ts">
	import { Icon } from '@demotivator/ui';
	import { portal } from '../utils/portal';

	const {
		modalId,
		linkClass = 'text-decoration-none small fw-semibold'
	}: {
		modalId: string;
		linkClass?: string;
	} = $props();

	const generateCaptcha = () => {
		const n1 = Math.floor(Math.random() * 9) + 1;
		const n2 = Math.floor(Math.random() * 9) + 1;
		return { n1, n2, answer: n1 + n2 };
	};

	let captcha = $state(generateCaptcha());
	let captchaInput = $state('');
	let email = $state('');
	let loading = $state(false);
	let error = $state('');
	let success = $state(false);

	const resetForm = () => {
		captcha = generateCaptcha();
		captchaInput = '';
		email = '';
		error = '';
		success = false;
		loading = false;
	};

	const loadModal = async () => {
		await import('bootstrap/js/dist/modal');
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		error = '';

		if (parseInt(captchaInput, 10) !== captcha.answer) {
			error = 'Incorrect answer. Please try again.';
			captcha = generateCaptcha();
			captchaInput = '';
			return;
		}

		loading = true;
		try {
			const { sendPasswordResetEmail } = await import('../utils/firebase');
			await sendPasswordResetEmail(email);
			success = true;
		} catch (err: unknown) {
			const firebaseErr = err as { code?: string; message?: string };
			const errorMessages: Record<string, string> = {
				'auth/user-not-found': 'No account found with that email address.',
				'auth/invalid-email': 'Please enter a valid email address.',
				'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
				'auth/network-request-failed': 'Network error. Please check your connection and try again.'
			};
			error = (firebaseErr?.code && errorMessages[firebaseErr.code]) ?? firebaseErr?.message ?? 'Failed to send reset email. Please try again.';
		} finally {
			loading = false;
		}
	};
</script>

<button
	type="button"
	class={linkClass}
	style="background: none; border: none; padding: 0; cursor: pointer;"
	data-bs-toggle="modal"
	data-bs-target={`#${modalId}`}
	onmouseover={loadModal}
	onfocus={loadModal}
	onclick={resetForm}
>
	Forgot password?
</button>

<div class="modal fade" use:portal id={modalId} tabindex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title fs-5 fw-bold" id={`${modalId}Label`}>
					<Icon name="key" /> Reset your password
				</h2>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>

			{#if success}
				<div class="modal-body text-start">
					<div class="alert alert-success d-flex align-items-center gap-2 mb-0" role="alert">
						<Icon name="check-circle-fill" />
						<span>Password reset email sent! Check your inbox and follow the instructions.</span>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			{:else}
				<form onsubmit={handleSubmit}>
					<div class="modal-body text-start d-flex flex-column gap-3">
						<p class="text-secondary mb-0">
							Enter your account email and prove you're human — we'll send you a link to reset your password.
						</p>

						{#if error}
							<div class="alert alert-danger d-flex align-items-center gap-2 mb-0" role="alert">
								<Icon name="exclamation-triangle-fill" />
								<span>{error}</span>
							</div>
						{/if}

						<div>
							<label class="form-label fw-semibold" for={`${modalId}-email`}>Email Address</label>
							<input
								id={`${modalId}-email`}
								type="email"
								class="form-control"
								placeholder="you@example.com"
								bind:value={email}
								required
							/>
						</div>

						<div>
							<label class="form-label fw-semibold" for={`${modalId}-captcha`}>
								Prove you're not a robot: What is {captcha.n1} + {captcha.n2}?
							</label>
							<input
								id={`${modalId}-captcha`}
								type="number"
								class="form-control"
								placeholder="Your answer"
								bind:value={captchaInput}
								required
								min="1"
								max="99"
							/>
						</div>
					</div>

					<div class="modal-footer">
						<button type="submit" class="btn btn-primary" disabled={loading}>
							{#if loading}
								<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
								Sending…
							{:else}
								<Icon name="send" /> Send Reset Email
							{/if}
						</button>
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>
