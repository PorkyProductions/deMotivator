export const updateInsultsSeen = async (insultsSeen: number) => {
	const { getFirestore, doc, setDoc } = await import('firebase/firestore');
	const { initializeApp } = await import('firebase/app');
	const { getAuth } = await import('firebase/auth');
	const { firebaseConfig } = await import('./insults');
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	const auth = getAuth(app);

	// Use currentUser instead of onAuthStateChanged for synchronous check
	const user = auth.currentUser;
	if (!user) {
		console.warn('updateInsultsSeen: No authenticated user, skipping database write');
		return;
	}

	const usersRef = doc(db, 'users', user.uid);
	await setDoc(
		usersRef,
		{
			insultsSeen: insultsSeen
		},
		{
			merge: true
		}
	);
};
