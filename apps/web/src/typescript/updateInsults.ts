export const updateInsultsSeen = async (insultsSeen: number): Promise<boolean> => {
	const { getFirestore, doc, runTransaction } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const { getFirebaseApp } = await import('../utils/firebase/firebaseApp');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	await auth.authStateReady();
	const normalizeInsultsSeen = (value: unknown): number => {
		const parsedValue = Math.floor(Number(value));
		if (!Number.isFinite(parsedValue) || parsedValue < 0) {
			return 0;
		}
		return parsedValue;
	};

	// Use currentUser instead of onAuthStateChanged for synchronous check
	const user = auth.currentUser;
	if (!user) {
		console.warn('updateInsultsSeen: No authenticated user, skipping database write');
		return false;
	}

	const usersRef = doc(db, 'users', user.uid);
	const leaderboardRef = doc(db, 'leaderboardEntries', user.uid);
	const incomingInsultsSeen = normalizeInsultsSeen(insultsSeen);
	await runTransaction(db, async (transaction) => {
		const [usersSnap, leaderboardSnap] = await Promise.all([
			transaction.get(usersRef),
			transaction.get(leaderboardRef)
		]);
		const usersInsultsSeen = normalizeInsultsSeen(usersSnap.data()?.insultsSeen);
		const leaderboardInsultsSeen = normalizeInsultsSeen(leaderboardSnap.data()?.insultsSeen);
		const nextInsultsSeen = Math.max(incomingInsultsSeen, usersInsultsSeen, leaderboardInsultsSeen);
		transaction.set(
			usersRef,
			{
				insultsSeen: nextInsultsSeen,
				displayName: user.displayName ?? '',
				photoURL: user.photoURL ?? ''
			},
			{ merge: true }
		);
		transaction.set(
			leaderboardRef,
			{ insultsSeen: nextInsultsSeen },
			{ merge: true }
		);
	});
	return true;
};
