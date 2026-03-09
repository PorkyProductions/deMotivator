export type ShareDestination = 'copy' | 'x' | 'facebook' | 'reddit' | 'email' | 'other';
import { url } from '../typescript/constants';

export interface ShareProviderButton {
	destination: ShareDestination;
	label: string;
	icon: string;
	buttonClass: string;
}

export interface SharePayload {
	shareTitle: string;
	shareUrl: string;
	shareText: string;
	shareBody: string;
}

interface CreateSharePayloadOptions {
	shareText: string;
	shareTitle?: string;
	fallbackUrl?: string;
}

export const defaultShareButtons: ShareProviderButton[] = [
	{ destination: 'copy', label: 'Copy', icon: 'clipboard', buttonClass: 'btn-primary' },
	{ destination: 'email', label: 'Email', icon: 'envelope', buttonClass: 'btn-secondary' },
	{ destination: 'x', label: 'Twitter / X', icon: 'twitter-x', buttonClass: 'share-btn-x' },
	{ destination: 'facebook', label: 'Facebook', icon: 'facebook', buttonClass: 'share-btn-facebook' },
	{ destination: 'reddit', label: 'Reddit', icon: 'reddit', buttonClass: 'share-btn-reddit' },
	{ destination: 'other', label: 'Other...', icon: 'three-dots', buttonClass: 'share-btn-other' }
];

const resolveShareUrl = (fallbackUrl: string) => {
	if (typeof window === 'undefined') {
		return fallbackUrl;
	}
	return url;
};

export const createSharePayload = ({
	shareText,
	shareTitle = '(de)Motivator',
	fallbackUrl = '/list.html'
}: CreateSharePayloadOptions): SharePayload => {
	const shareUrl = resolveShareUrl(fallbackUrl);
	const shareBody = `${shareText}\n\n${shareUrl}`;
	return {
		shareTitle,
		shareUrl,
		shareText,
		shareBody
	};
};

export const getShareDestinationUrl = (destination: ShareDestination, sharePayload: SharePayload) => {
	if (destination === 'x') {
		return `https://twitter.com/intent/tweet?text=${encodeURIComponent(sharePayload.shareText)}&url=${encodeURIComponent(sharePayload.shareUrl)}`;
	}
	if (destination === 'facebook') {
		return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharePayload.shareUrl)}&quote=${encodeURIComponent(sharePayload.shareText)}`;
	}
	if (destination === 'reddit') {
		return `https://www.reddit.com/submit?url=${encodeURIComponent(sharePayload.shareUrl)}&title=${encodeURIComponent(sharePayload.shareText)}`;
	}
	return '';
};

export const openShareWindow = (url: string) => {
	if (typeof window === 'undefined') {
		return;
	}
	window.open(url, '_blank', 'noopener,noreferrer');
};

export const openShareEmail = (sharePayload: SharePayload) => {
	if (typeof window === 'undefined') {
		return;
	}
	window.location.href = `mailto:?subject=${encodeURIComponent(sharePayload.shareTitle)}&body=${encodeURIComponent(sharePayload.shareBody)}`;
};
