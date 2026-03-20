export const getFirebaseApp = async () => {
	const { getApps, getApp, initializeApp } = await import('firebase/app');
	const { firebaseConfig } = await import('../firebase');
	return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
};
