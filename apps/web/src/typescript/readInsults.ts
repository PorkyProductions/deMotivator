import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { GlobInsultDBQueryResponse, type InsultDBQueryResponse  } from './types';
export const readInsults = async (): Promise<number> => {
	const { getFirestore, doc, runTransaction } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const { getFirebaseApp } = await import('../utils/firebase/firebaseApp');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	const normalizeInsultsSeen = (value: unknown): number => {
		const parsedValue = Math.floor(Number(value));
		if (!Number.isFinite(parsedValue) || parsedValue < 0) {
			return 0;
		}
		return parsedValue;
	};

	await auth.authStateReady();

	const user = auth.currentUser;
	if (!user) {
		return 0;
	}

	const usersRef = doc(db, 'users', user.uid);
	const leaderboardRef = doc(db, 'leaderboardEntries', user.uid);
	const insultsSeen = await runTransaction(db, async (transaction) => {
		const [usersSnap, leaderboardSnap] = await Promise.all([
			transaction.get(usersRef),
			transaction.get(leaderboardRef)
		]);
		if (!usersSnap.exists() && !leaderboardSnap.exists()) {
			return 0;
		}
		const usersData: InsultDBQueryResponse = usersSnap.exists() ? usersSnap.data() : {};
		const usersInsultsSeen = normalizeInsultsSeen(usersData.insultsSeen);
		const leaderboardInsultsSeen = normalizeInsultsSeen(leaderboardSnap.data()?.insultsSeen);
		const reconciledInsultsSeen = Math.max(usersInsultsSeen, leaderboardInsultsSeen);
		if (usersInsultsSeen !== reconciledInsultsSeen) {
			transaction.set(usersRef, { insultsSeen: reconciledInsultsSeen }, { merge: true });
		}
		if (leaderboardInsultsSeen !== reconciledInsultsSeen) {
			transaction.set(leaderboardRef, { insultsSeen: reconciledInsultsSeen }, { merge: true });
		}
		return reconciledInsultsSeen;
	});
	return insultsSeen;
};
export let leaderboard: GlobInsultDBQueryResponse[] = [];

export const getListOfAllUsersWhoHaveSeenInsults = async (): Promise<QuerySnapshot<DocumentData>> => {
	const { getFirestore, getDocs, collection, where, query } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');
	const { getFirebaseApp } = await import('../utils/firebase/firebaseApp');
	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	await auth.authStateReady();
	const currentUserId = auth.currentUser?.uid ?? null;
	const currentUserDisplayName = auth.currentUser?.displayName ?? auth.currentUser?.email ?? '';
	const currentUserPhotoUrl = auth.currentUser?.photoURL ?? '';
	const leaderboardCollectionRef = collection(db, 'leaderboardEntries');
	const querySnapshot = await getDocs(query(leaderboardCollectionRef, where('insultsSeen', '>', 0)));
	const entriesByReferrer = new Map<string, GlobInsultDBQueryResponse>();
	querySnapshot.forEach((entryDoc) => {
		entriesByReferrer.set(entryDoc.id, {
			referrer: entryDoc.id,
			data: entryDoc.data().insultsSeen
		});
	});

	const nextLeaderboard = Array.from(entriesByReferrer.values());
	const hydratedLeaderboard = nextLeaderboard.map((entry) => {
		const referrer = entry.referrer ?? '';
		const isCurrentUser = currentUserId !== null && referrer === currentUserId;
		const displayName = isCurrentUser
			? currentUserDisplayName.trim() || referrer
			: referrer;
		const photoUrl = isCurrentUser
			? currentUserPhotoUrl.trim()
			: '';
		return {
			...entry,
			displayName: displayName,
			photoUrl: photoUrl,
			isCurrentUser: isCurrentUser
		};
	});

	leaderboard = hydratedLeaderboard;
	leaderboard.sort((a, b) => Number(a.data ?? 0) - Number(b.data ?? 0));
	leaderboard = leaderboard.reverse();
	console.log('SCOREBOARD: ', leaderboard);
	return querySnapshot;
};

