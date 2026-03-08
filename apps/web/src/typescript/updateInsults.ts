export const updateInsultsSeen = async (insultsSeen: number): Promise<boolean> => {
	const { getFirestore, doc, writeBatch } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const { getFirebaseApp } = await import('../utils/firebase/firebaseApp');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);

	// Use currentUser instead of onAuthStateChanged for synchronous check
	const user = auth.currentUser;
	if (!user) {
		console.warn('updateInsultsSeen: No authenticated user, skipping database write');
		return false;
	}

	const batch = writeBatch(db);
	batch.set(
		doc(db, 'users', user.uid),
		{
			insultsSeen: insultsSeen,
			displayName: user.displayName ?? '',
			photoURL: user.photoURL ?? ''
		},
		{ merge: true }
	);
	batch.set(
		doc(db, 'leaderboardEntries', user.uid),
		{ insultsSeen: insultsSeen },
		{ merge: true }
	);
	await batch.commit();
	return true;
};
