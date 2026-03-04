const calcInsultFontSizeRem = (text: string | undefined, windowWidth: number) => {
	if (!text) return '1.4rem';
	const len = Math.max(1, text.trim().length);
	const base = windowWidth >= 1280 ? 5.5 : windowWidth >= 768 ? 4.5 : 3.2;
	const scaleFactor = Math.pow(40 / Math.min(len, 400), 0.35);
	const size = base * scaleFactor;
	const clamped = Math.max(1.1, Math.min(base, size));
	return `${clamped.toFixed(3)}rem`;
};

export { calcInsultFontSizeRem };
