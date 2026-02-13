import { get, writable } from 'svelte/store';
import { onAuthStateChanged } from './firebase';

export type UserSettings = {
	allowProfanity: boolean;
};

const defaultSettings: UserSettings = {
	allowProfanity: false
};

const settingsStore = writable<UserSettings>({ ...defaultSettings });

const sanitizeSettings = (settings: Partial<UserSettings> | null | undefined): UserSettings => ({
	allowProfanity: Boolean(settings?.allowProfanity)
});

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

const saveUserSettings = async (settings: UserSettings): Promise<void> => {
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
	await setDoc(
		userRef,
		{
			settings: settings
		},
		{
			merge: true
		}
	);
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

export { settingsStore, defaultSettings, initSettingsListener, setUserSettings, exportSettingsJson };
