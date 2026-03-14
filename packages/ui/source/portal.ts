export const portal = (el: HTMLElement, target: string = 'body') => {
	const targetEl = document.querySelector(target) as HTMLElement;
	targetEl.appendChild(el);
	return {
		destroy() {
			el.parentNode?.removeChild(el);
		}
	};
};
