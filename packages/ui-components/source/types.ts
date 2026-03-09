export type BSVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
// Deprecated compatibility alias for existing callers using the historical misspelling.
export type BSVarient = BSVariant;

export interface BsAlertProps {
	type: BSVariant;
	icon: string;
	text: string;
	actionLink: string;
	actionText: string;
}

export interface BsBadgeProps {
	type: BSVariant;
	text: string;
}

export interface BsButtonProps {
	href: string;
	type: BSVariant;
	text: string;
	icon: string;
}

export interface BsLoaderProps {
	type: BSVariant;
	loadingTime: number;
}

export interface BsModalProps {
	preButtonType: BSVariant;
	preButtonText: string;
	preButtonIcon: string;
	icon: string;
	title: string;
	body: string;
	confirmButtonType: BSVariant;
	confirmButtonText: string;
	confirmButtonAction: () => void;
	closeButtonType: BSVariant;
	closeButtonText: string;
}

export interface BsSpinnerProps {
	type: BSVariant;
	darkMode?: boolean;
}

export interface IconProps {
	name: string;
}
