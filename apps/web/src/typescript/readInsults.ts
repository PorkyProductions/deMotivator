import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { GlobInsultDBQueryResponse, type InsultDBQueryResponse  } from './types';
export const readInsults = async (): Promise<number> => {
	const { getFirestore, doc, getDoc, setDoc } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const { getFirebaseApp } = await import('../utils/firebase/firebaseApp');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);

	await auth.authStateReady();

	const user = auth.currentUser;
	if (!user) {
		return 0;
	}

	const usersRef = doc(db, 'users', user.uid);
	const usersSnap = await getDoc(usersRef);
	if (!usersSnap.exists()) {
		return 0;
	}

	const data: InsultDBQueryResponse = usersSnap.data();
	const insultsSeen = typeof data.insultsSeen === 'number' ? data.insultsSeen : 0;
	const leaderboardRef = doc(db, 'leaderboardEntries', user.uid);
	await setDoc(leaderboardRef, { insultsSeen }, { merge: true });
	return insultsSeen;
};
export let leaderboard: GlobInsultDBQueryResponse[] = [];

export const getListOfAllUsersWhoHaveSeenInsults = async (): Promise<QuerySnapshot<DocumentData>> => {
	const { getFirestore, getDocs, collection, where, query, documentId  } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const { getFirebaseApp } = await import('../utils/firebase/firebaseApp');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	await auth.authStateReady();
	const currentUserId = auth.currentUser?.uid ?? null;
	const currentUserDisplayName = auth.currentUser?.displayName ?? auth.currentUser?.email ?? '';
	const leaderboardCollectionRef = collection(db, 'leaderboardEntries');
	const querySnapshot = await getDocs(query(leaderboardCollectionRef, where('insultsSeen', '>', 0)));
	const nextLeaderboard: GlobInsultDBQueryResponse[] = [];
	querySnapshot.forEach((doc) => nextLeaderboard.push({
		referrer: doc.id,
		data: doc.data().insultsSeen
	}));

	const leaderboardReferrers = nextLeaderboard
		.map((entry) => entry.referrer)
		.filter((referrer): referrer is string => typeof referrer === 'string' && referrer.length > 0);
	const userCollectionRef = collection(db, 'users');
	const userRecordsById = new Map<string, DocumentData>();
	const maxIdsPerUsersQuery = 10;

	for (let index = 0; index < leaderboardReferrers.length; index += maxIdsPerUsersQuery) {
		const referrerChunk = leaderboardReferrers.slice(index, index + maxIdsPerUsersQuery);
		if (referrerChunk.length === 0) {
			continue;
		}
		const usersSnapshot = await getDocs(
			query(userCollectionRef, where(documentId(), 'in', referrerChunk))
		);
		usersSnapshot.forEach((userDoc) => {
			userRecordsById.set(userDoc.id, userDoc.data());
		});
	}

	const hydratedLeaderboard = nextLeaderboard.map((entry) => {
		const referrer = entry.referrer ?? '';
		const userData = userRecordsById.get(referrer);
		const userEmailLocalPart =
			typeof userData?.email === 'string'
				? userData.email.split('@')[0]?.replace(/[._-]+/g, ' ').trim()
				: '';
		const fallbackDisplayName = (
			(currentUserId !== null && referrer === currentUserId && currentUserDisplayName.trim())
			|| userEmailLocalPart
			|| referrer
		);
		const displayName =
			(typeof userData?.displayName === 'string' && userData.displayName.trim())
				|| (typeof userData?.name === 'string' && userData.name.trim())
				|| fallbackDisplayName;
		const photoUrl =
			(typeof userData?.photoURL === 'string' && userData.photoURL.trim())
				|| (typeof userData?.photoUrl === 'string' && userData.photoUrl.trim())
				|| '';
		return {
			...entry,
			displayName: displayName,
			photoUrl: photoUrl,
			isCurrentUser: currentUserId !== null && referrer === currentUserId
		};
	});

	const dedupedLeaderboardByReferrer = new Map<string, GlobInsultDBQueryResponse>();
	for (const entry of hydratedLeaderboard) {
		if (entry.referrer) {
			dedupedLeaderboardByReferrer.set(entry.referrer, entry);
		}
	}

	leaderboard = Array.from(dedupedLeaderboardByReferrer.values());
	leaderboard.sort((a, b) => Number(a.data ?? 0) - Number(b.data ?? 0));
	leaderboard = leaderboard.reverse();
	console.log('SCOREBOARD: ', leaderboard);
	return querySnapshot;
};

