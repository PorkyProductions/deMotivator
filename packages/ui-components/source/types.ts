export type BSVarient = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export interface BsAlertProps {
	type: BSVarient;
	icon: string;
	text: string;
	actionLink: string;
	actionText: string;
}

export interface BsBadgeProps {
	type: BSVarient;
	text: string;
}

export interface BsButtonProps {
	href: string;
	type: BSVarient;
	text: string;
	icon: string;
}

export interface BsLoaderProps {
	type: BSVarient;
	loadingTime: number;
}

export interface BsModalProps {
	preButtonType: BSVarient;
	preButtonText: string;
	preButtonIcon: string;
	icon: string;
	title: string;
	body: string;
	confirmButtonType: BSVarient;
	confirmButtonText: string;
	confirmButtonAction: () => void;
	closeButtonType: BSVarient;
	closeButtonText: string;
}

export interface BsSpinnerProps {
	type: BSVarient;
}

export interface IconProps {
	name: string;
}
