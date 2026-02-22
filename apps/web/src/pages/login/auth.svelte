<!-- Auth.svelte -->

<script lang="ts">
	import { loginWithEmailPassword, loginWithGoogle, signInAnonymous, logout, onAuthStateChanged } from '../../utils/firebase';
	// Loading Logic

	// FROM BEYOND THIS POINT IS FIREBASE LOGIC
	// BEWARE

	// Firebase user
	let user: { user_id?: string; id?: string; name?: string; email?: string; picture?: string; } | null = $state(null);

	// expose property on the component that we can use
	// to choose if we want use popup or redirect
	const { useRedirect = false }: { useRedirect?: boolean } = $props();

	// Create wrapped versions of the auth functions to handle useRedirect
	const wrappedLoginWithGoogle = () => {
		return loginWithGoogle(useRedirect);
	};

	// Setup auth state listener
	onAuthStateChanged((mappedUser) => {
		user = mappedUser;
	});

	// reactive helper variable(s)
	const loggedIn = $derived(user !== null);
</script>

<!-- we will expose all required methods and properties on our slot -->
<div>
	<slot {user} {loggedIn} loginWithGoogle={wrappedLoginWithGoogle} {loginWithEmailPassword} signInAnonomous={signInAnonymous} {logout}>Error fetching Login API. Sorry about that :(</slot>
</div>
