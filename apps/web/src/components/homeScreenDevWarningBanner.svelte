<script lang="ts">
	import '../styles/scss/alertsBootstrap.scss';
	import { BsAlert } from '@demotivator/ui';
	import type { BsAlertProps } from '@demotivator/ui';
	const warningBannerProps: BsAlertProps = {
		type: 'warning',
		icon: 'cone-striped',
		text: 'This is a development beta site. Some things might not work properly, or may otherwise be broken',
		actionLink: 'https://demotivator.web.app',
		actionText: 'Go to the normal (de)Motivator'

	};
</script>
<BsAlert {...warningBannerProps} />
