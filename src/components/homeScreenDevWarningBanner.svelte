<script lang="ts">
	import '../styles/scss/alertsBootstrap.scss'
	import BsAlert from './bs-Alert.svelte';
	import { BSVarient } from '../typescript/types';
	const warnBannerProps : { type: BSVarient; icon: string; text: string; actionLink: string; actionText: string; } = { 
        type: "warning",
        icon: "cone-striped",
        text: "Heads Up! This is a development beta site. Some things might not work properly, or may otherwise be broken",
        actionLink: "https://demotivator.web.app",
        actionText: "Go to the normal (de)Motivator"

    }
</script>
<BsAlert {...warnBannerProps}  />