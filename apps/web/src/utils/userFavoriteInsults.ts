import { getFirebaseApp } from './firebase/firebaseApp';

const sanitizeFavoriteInsults = (value: unknown): string[] => {
	if (!Array.isArray(value)) {
		return [];
	}
	const sanitizedFavoriteInsults: string[] = [];
	for (const item of value) {
		if (typeof item !== 'string') {
			continue;
		}
		if (sanitizedFavoriteInsults.includes(item)) {
			continue;
		}
		sanitizedFavoriteInsults.push(item);
	}
	return sanitizedFavoriteInsults;
};

const readUserFavoriteInsults = async (userId: string): Promise<string[]> => {
	const { getFirestore, doc, getDoc } = await import('firebase/firestore');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const userRef = doc(db, 'users', userId);
	const userSnap = await getDoc(userRef);
	if (!userSnap.exists()) {
		return [];
	}
	const userData = userSnap.data();
	return sanitizeFavoriteInsults(userData?.favoriteInsults);
};

const saveUserFavoriteInsults = async (favoriteInsults: Iterable<string>): Promise<void> => {
	const { getFirestore, doc, updateDoc, setDoc } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	const user = auth.currentUser;
	if (!user) {
		throw new Error('saveUserFavoriteInsults: No authenticated user.');
	}
	const sanitizedFavoriteInsults = sanitizeFavoriteInsults(Array.from(favoriteInsults));
	const userRef = doc(db, 'users', user.uid);
	try {
		await updateDoc(userRef, { favoriteInsults: sanitizedFavoriteInsults });
	} catch (error: unknown) {
		const isNotFoundError = error && typeof error === 'object' && 'code' in error
			&& (error.code === 'not-found' || error.code === 'NOT_FOUND');
		if (!isNotFoundError) {
			throw error;
		}
		await setDoc(
			userRef,
			{ favoriteInsults: sanitizedFavoriteInsults },
			{ merge: true }
		);
	}
};

export { readUserFavoriteInsults, saveUserFavoriteInsults };
