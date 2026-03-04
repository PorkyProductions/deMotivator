import type { UserSettingKey, UserSettings } from '../../../utils/userSettings';

export interface ToggleSettingConfig {
	key: UserSettingKey;
	title: string;
	icon: string;
	label: string;
	description: string;
	enableWarningMessage?: string;
}

export type NumericSettingKey = {
	[K in UserSettingKey]: UserSettings[K] extends number ? K : never;
}[UserSettingKey];

export interface NumericSettingConfig {
	key: NumericSettingKey;
	title: string;
	icon: string;
	label: string;
	description: string;
	min: number;
	max: number;
	step?: number;
}

export interface PackSettingConfig {
	key: string;
	title: string;
	explicit: boolean;
}
