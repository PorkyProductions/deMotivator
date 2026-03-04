import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { GlobInsultDBQueryResponse, type InsultDBQueryResponse  } from './types';
export const readInsults = async (): Promise<number> => {
	const { getFirestore, doc, getDoc } = await import('firebase/firestore');
	const { initializeApp } = await import('firebase/app');
	const { getAuth } = await import('firebase/auth');
	const { firebaseConfig } = await import('./insults');
	const app = initializeApp(firebaseConfig);
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
	return typeof data.insultsSeen === 'number' ? data.insultsSeen : 0;
};
export let leaderboard: GlobInsultDBQueryResponse[] = [];

export const getListOfAllUsersWhoHaveSeenInsults = async (): Promise<QuerySnapshot<DocumentData>> => {
	leaderboard = [];
	const { getFirestore, getDocs, collection, where, query  } = await import('firebase/firestore');
	const { initializeApp } = await import('firebase/app');
	const { firebaseConfig } = await import('./insults');
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	const usersCollectionRef = collection(db, 'users');
	const querySnapshot = await getDocs(query(usersCollectionRef, where('insultsSeen', '>', 0)));
	querySnapshot.forEach((doc) => leaderboard.push({
		referrer: doc.id,
		data: doc.data().insultsSeen
	}));
	leaderboard.sort((a, b) => Number(a.data ?? 0) - Number(b.data ?? 0));
	leaderboard = leaderboard.reverse() as GlobInsultDBQueryResponse[];
	console.log('SCOREBOARD: ', leaderboard);
	return querySnapshot;
};

