// Simple UA stub to replace `uadetect` without accessing camera/mic/location
// Exports: getCurrentUA, deviceType, OS

export const getCurrentUA = () => {
	if (typeof navigator !== 'undefined' && navigator.userAgent) return navigator.userAgent;
	return 'unknown';
};

export const deviceType = (() => {
	if (typeof navigator === 'undefined' || typeof window === 'undefined') return 'desktop';
	const ua = navigator.userAgent || '';
	// Prefer a lightweight UA sniff fallback to window size
	if (/Mobi|Android/i.test(ua)) return 'mobile';
	if (/Tablet|iPad/i.test(ua)) return 'tablet';
	// fallback to viewport
	if (window.innerWidth <= 768) return 'mobile';
	if (window.innerWidth <= 1024) return 'tablet';
	return 'desktop';
})();

export const OS = (() => {
	if (typeof navigator === 'undefined') return 'Unknown';
	const ua = navigator.userAgent || '';
	if (/Android/i.test(ua)) return 'Android';
	if (/iPad|iPhone|iPod/i.test(ua)) return 'iOS';
	if (/Win(dows )?/i.test(ua)) return 'Windows';
	if (/Macintosh|Mac OS X/i.test(ua)) return 'Mac';
	return 'Unknown';
})();
