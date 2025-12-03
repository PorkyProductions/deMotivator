export interface NavItem {
	name: string;
	href: string;
	icon: string;
	external?: boolean;
}

export const navigation: NavItem[] = [
	{ name: 'Home', href: '/', icon: 'house-door-fill' },
	{ name: '(de)Motivator 1.0', href: 'dmv1.html', icon: 'clock-history' },
	{ name: '(de)Motivator.js', href: 'https://github.com/PorkyProductions/deMotivator.js', icon: 'github', external: true },
	{ name: 'Leaderboard', href: 'leaderboard.html', icon: 'trophy-fill' },
];

export default navigation;
