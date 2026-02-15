import { get, writable } from 'svelte/store';
import { onAuthStateChanged } from './firebase';

export type UserSettings = {
	allowProfanity: boolean;
	maxInsultWords: number;
};

type SettingDefinition<T> = {
	defaultValue: T;
	sanitize: (value: unknown) => T;
};

const maxInsultWordsMin = 0;
const maxInsultWordsMax = 100;
const maxInsultWordsDefault = 25;

type UserSettingsDefinitionMap = {
	[K in keyof UserSettings]: SettingDefinition<UserSettings[K]>;
};

const userSettingsDefinitionMap: UserSettingsDefinitionMap = {
	allowProfanity: {
		defaultValue: false,
		sanitize: (value) => Boolean(value)
	},
	maxInsultWords: {
		defaultValue: maxInsultWordsDefault,
		sanitize: (value) => {
			const parsedValue = Math.floor(Number(value));
			if (!Number.isFinite(parsedValue)) {
				return maxInsultWordsDefault;
			}
			if (parsedValue <= maxInsultWordsMin) {
				return maxInsultWordsMin;
			}
			return Math.max(maxInsultWordsMin, Math.min(maxInsultWordsMax, parsedValue));
		}
	}
};

export type UserSettingKey = keyof UserSettings;
const userSettingKeys = Object.keys(userSettingsDefinitionMap) as UserSettingKey[];

const createDefaultSettings = (): UserSettings => {
	const defaults = {} as UserSettings;
	for (const key of userSettingKeys) {
		defaults[key] = userSettingsDefinitionMap[key].defaultValue;
	}
	return defaults;
};

const defaultSettings: UserSettings = createDefaultSettings();

const settingsStore = writable<UserSettings>({ ...defaultSettings });

const sanitizeSettings = (settings: Partial<UserSettings> | null | undefined): UserSettings => {
	const sanitizedSettings = {} as UserSettings;
	for (const key of userSettingKeys) {
		sanitizedSettings[key] = userSettingsDefinitionMap[key].sanitize(settings?.[key]);
	}
	return sanitizedSettings;
};

const sanitizePartialSettings = (settings: Partial<UserSettings>): Partial<UserSettings> => {
	const sanitizedSettings: Partial<UserSettings> = {};
	for (const key of userSettingKeys) {
		if (!(key in settings)) {
			continue;
		}
		sanitizedSettings[key] = userSettingsDefinitionMap[key].sanitize(settings[key]);
	}
	return sanitizedSettings;
};

const getFirebaseApp = async () => {
	const { getApps, getApp, initializeApp } = await import('firebase/app');
	const { firebaseConfig } = await import('../typescript/insults');
	return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
};

const readUserSettings = async (userId: string): Promise<UserSettings> => {
	const { getFirestore, doc, getDoc } = await import('firebase/firestore');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const userRef = doc(db, 'users', userId);
	const userSnap = await getDoc(userRef);
	if (!userSnap.exists()) {
		return { ...defaultSettings };
	}
	const data = userSnap.data();
	return sanitizeSettings(data?.settings);
};

const saveUserSettings = async (settings: Partial<UserSettings>): Promise<void> => {
	const { getFirestore, doc, setDoc } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	const user = auth.currentUser;
	if (!user) {
		throw new Error('saveUserSettings: No authenticated user.');
	}
	const userRef = doc(db, 'users', user.uid);
	const settingsPatch: Record<string, UserSettings[UserSettingKey]> = {};
	for (const key of userSettingKeys) {
		if (!(key in settings)) {
			continue;
		}
		settingsPatch[`settings.${key}`] = settings[key] as UserSettings[UserSettingKey];
	}
	if (Object.keys(settingsPatch).length === 0) {
		return;
	}
	await setDoc(
		userRef,
		settingsPatch,
		{
			merge: true
		}
	);
};

const setUserSettings = async (partialSettings: Partial<UserSettings>) => {
	const sanitizedPartialSettings = sanitizePartialSettings(partialSettings);
	const currentSettings = get(settingsStore);
	const nextSettings = {
		...currentSettings,
		...sanitizedPartialSettings
	};
	settingsStore.set(nextSettings);
	await saveUserSettings(sanitizedPartialSettings);
};

const setUserSetting = async <K extends UserSettingKey>(key: K, value: UserSettings[K]) => {
	await setUserSettings({ [key]: value } as Partial<UserSettings>);
};

const exportSettingsJson = (settings: UserSettings) => JSON.stringify(settings, null, 2);

let settingsListenerActive = false;

const initSettingsListener = () => {
	if (settingsListenerActive) return;
	settingsListenerActive = true;
	onAuthStateChanged(async (user) => {
		const userId = user?.id ?? user?.user_id;
		if (!userId) {
			settingsStore.set({ ...defaultSettings });
			return;
		}
		try {
			const loadedSettings = await readUserSettings(userId);
			settingsStore.set(loadedSettings);
		} catch (error) {
			console.error('Failed to load user settings', error);
			settingsStore.set({ ...defaultSettings });
		}
	});
};

export { settingsStore, defaultSettings, initSettingsListener, setUserSettings, setUserSetting, exportSettingsJson };
export { maxInsultWordsMin, maxInsultWordsMax };
