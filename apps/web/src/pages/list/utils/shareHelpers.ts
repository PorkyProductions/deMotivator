export type ShareDestination = 'copy' | 'x' | 'facebook' | 'reddit' | 'email' | 'other';

export interface ShareProviderButton {
destination: ShareDestination;
label: string;
icon: string;
buttonClass: string;
}

export interface SharePayload {
shareUrl: string;
insultQuote: string;
shareBody: string;
}

export const shareButtons: ShareProviderButton[] = [
	{ destination: 'copy', label: 'Copy', icon: 'clipboard', buttonClass: 'btn-primary' },
	{ destination: 'email', label: 'Email', icon: 'envelope', buttonClass: 'btn-secondary' },
	{ destination: 'x', label: 'Twitter / X', icon: 'twitter-x', buttonClass: 'share-btn-x' },
	{ destination: 'facebook', label: 'Facebook', icon: 'facebook', buttonClass: 'share-btn-facebook' },
	{ destination: 'reddit', label: 'Reddit', icon: 'reddit', buttonClass: 'share-btn-reddit' },
	{ destination: 'other', label: 'Other...', icon: 'three-dots', buttonClass: 'share-btn-other' }
];

const resolveShareUrl = () => {
	return typeof window === 'undefined' ? '/list.html' : window.location.href;
};

export const createSharePayload = (insult: string): SharePayload => {
	const shareUrl = resolveShareUrl();
	const insultQuote = `"${insult}"`;
	const shareBody = `${insultQuote}\n\n${shareUrl}`;
	return { shareUrl, insultQuote, shareBody };
};

export const getShareDestinationUrl = (destination: ShareDestination, sharePayload: SharePayload) => {
	if (destination === 'x') {
		return `https://twitter.com/intent/tweet?text=${encodeURIComponent(sharePayload.insultQuote)}&url=${encodeURIComponent(sharePayload.shareUrl)}`;
	}
	if (destination === 'facebook') {
		return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharePayload.shareUrl)}&quote=${encodeURIComponent(sharePayload.insultQuote)}`;
	}
	if (destination === 'reddit') {
		return `https://www.reddit.com/submit?url=${encodeURIComponent(sharePayload.shareUrl)}&title=${encodeURIComponent(sharePayload.insultQuote)}`;
	}
	return '';
};

export const openShareWindow = (url: string) => {
	if (typeof window === 'undefined') {
		return;
	}
	window.open(url, '_blank', 'noopener,noreferrer');
};

export const openShareEmail = (shareBody: string) => {
	if (typeof window === 'undefined') {
		return;
	}
	window.location.href = `mailto:?subject=${encodeURIComponent('(de)Motivator insult')}&body=${encodeURIComponent(shareBody)}`;
};
