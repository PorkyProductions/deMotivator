/**
 * Svelte action that moves an element to a target in the DOM (defaults to body).
 * Used to escape stacking contexts created by backdrop-filter or z-index on parent elements,
 * which would otherwise trap Bootstrap modals behind their own backdrop.
 */
export function portal(el: HTMLElement, target: string = 'body') {
	const targetEl = document.querySelector(target) as HTMLElement;
	targetEl.appendChild(el);
	return {
		destroy() {
			el.parentNode?.removeChild(el);
		}
	};
}
