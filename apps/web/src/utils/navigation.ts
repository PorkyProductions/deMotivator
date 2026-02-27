export interface NavItem {
	name: string;
	shortName: string;
	href: string;
	icon: string;
	external?: boolean;
}

export const navigation: NavItem[] = [
	{ name: 'Home', shortName: 'Home', href: '/', icon: 'house-door-fill' },
	{ name: '(de)Motivator 1.0', shortName: 'v1.0', href: 'dmv1.html', icon: 'clock-history' },
	{ name: '(de)Motivator.js', shortName: '.js', href: 'https://github.com/PorkyProductions/deMotivator.js', icon: 'github', external: true },
	{ name: 'Settings', shortName: 'Settings', href: 'settings.html', icon: 'gear-fill' },
	{ name: 'Leaderboard', shortName: 'Board', href: 'leaderboard.html', icon: 'trophy-fill' }
];

export default navigation;
