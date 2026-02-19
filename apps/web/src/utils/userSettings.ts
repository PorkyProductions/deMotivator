import { get, writable } from 'svelte/store';
import { onAuthStateChanged } from './firebase';
import { insultPackList } from 'demotivator';

export type UserSettings = {
	allowProfanity: boolean;
	maxInsultWords: number;
	selectedPacks: string[];
};

type SettingDefinition<T> = {
	defaultValue: T;
	sanitize: (value: unknown) => T;
};

const maxInsultWordsMin = 0;
const maxInsultWordsMax = 100;
const maxInsultWordsDefault = 25;
const fallbackPackKey = insultPackList.find((pack) => !pack.explicit)?.key ?? insultPackList[0]?.key ?? 'original';
const availableInsultPacks = insultPackList.map((pack) => ({
	key: pack.key,
	title: pack.title,
	explicit: pack.explicit
}));
const availablePackKeySet = new Set(availableInsultPacks.map((pack) => pack.key));
const explicitPackKeySet = new Set(availableInsultPacks.filter((pack) => pack.explicit).map((pack) => pack.key));

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
	},
	selectedPacks: {
		defaultValue: [fallbackPackKey],
		sanitize: (value) => {
			if (!Array.isArray(value)) {
				return [fallbackPackKey];
			}
			const selectedPacks: string[] = [];
			for (const packKey of value) {
				if (typeof packKey !== 'string') {
					continue;
				}
				if (!availablePackKeySet.has(packKey)) {
					continue;
				}
				if (selectedPacks.includes(packKey)) {
					continue;
				}
				selectedPacks.push(packKey);
			}
			if (selectedPacks.length === 0) {
				return [fallbackPackKey];
			}
			return selectedPacks;
		}
	}
};

export type UserSettingKey = keyof UserSettings;
const userSettingKeys = Object.keys(userSettingsDefinitionMap) as UserSettingKey[];

const resolveEnabledPackKeys = (settings: Pick<UserSettings, 'allowProfanity' | 'selectedPacks'>): string[] => {
	const allowedPacks = settings.selectedPacks.filter((packKey) => {
		if (settings.allowProfanity) {
			return true;
		}
		return !explicitPackKeySet.has(packKey);
	});
	if (allowedPacks.length > 0) {
		return allowedPacks;
	}
	const nonExplicitFallback = availableInsultPacks.find((pack) => !pack.explicit)?.key;
	if (nonExplicitFallback) {
		return [nonExplicitFallback];
	}
	return [fallbackPackKey];
};

const createDefaultSettings = (): UserSettings => {
	const defaults = Object.fromEntries(
		userSettingKeys.map((key) => [key, userSettingsDefinitionMap[key].defaultValue])
	) as UserSettings;
	defaults.selectedPacks = resolveEnabledPackKeys(defaults);
	return defaults;
};

const defaultSettings: UserSettings = createDefaultSettings();

const settingsStore = writable<UserSettings>({ ...defaultSettings });

const sanitizeSettings = (settings: Partial<UserSettings> | null | undefined): UserSettings => {
	const sanitizedSettings = Object.fromEntries(
		userSettingKeys.map((key) => [key, userSettingsDefinitionMap[key].sanitize(settings?.[key])])
	) as UserSettings;
	sanitizedSettings.selectedPacks = resolveEnabledPackKeys(sanitizedSettings);
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
	const { getFirestore, doc, updateDoc, setDoc } = await import('firebase/firestore');
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
	try {
		await updateDoc(userRef, settingsPatch);
	} catch (error: unknown) {
		const isNotFoundError =
			error &&
			typeof error === 'object' &&
			'code' in error &&
			(error.code === 'not-found' || error.code === 'NOT_FOUND');
		if (isNotFoundError) {
			const sanitizedSettings = sanitizeSettings(settings);
			await setDoc(userRef, { settings: sanitizedSettings });
		} else {
			throw error;
		}
	}
};

const setUserSettings = async (partialSettings: Partial<UserSettings>) => {
	const currentSettings = get(settingsStore);
	const nextSettings = sanitizeSettings({
		...currentSettings,
		...partialSettings
	});
	settingsStore.set(nextSettings);
	await saveUserSettings(nextSettings);
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
export { availableInsultPacks, resolveEnabledPackKeys };
