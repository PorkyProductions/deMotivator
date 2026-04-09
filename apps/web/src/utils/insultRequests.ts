import { getFirebaseApp } from './firebase/firebaseApp';

export type InsultRequestStatus = 'pending' | 'approved' | 'rejected';

const asInsultRequestStatus = (value: unknown): InsultRequestStatus => {
	if (value === 'pending' || value === 'approved' || value === 'rejected') {
		return value;
	}
	throw new Error(`Invalid insult request status: ${String(value)}`);
};

export interface InsultRequest {
	id?: string;
	text: string;
	status: InsultRequestStatus;
	requestedByUid: string;
	requestedByName: string | null;
	requestedByEmail: string | null;
	createdAt: Date;
	reviewedAt?: Date;
	reviewedByUid?: string;
}

export const submitInsultRequest = async (text: string): Promise<void> => {
	const { getFirestore, collection, addDoc, serverTimestamp } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');

	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	await auth.authStateReady();
	const user = auth.currentUser;

	if (!user) {
		throw new Error('You must be logged in to submit an insult request.');
	}

	if (!text || text.trim().length === 0) {
		throw new Error('Insult text cannot be empty.');
	}

	const requestsRef = collection(db, 'insultRequests');

	await addDoc(requestsRef, {
		text: text.trim(),
		status: 'pending',
		requestedByUid: user.uid,
		requestedByName: user.displayName || null,
		requestedByEmail: user.email || null,
		createdAt: serverTimestamp()
	});
};

export const listInsultRequests = async (statusFilter?: InsultRequestStatus): Promise<InsultRequest[]> => {
	const { getFirestore, collection, query, where, orderBy, getDocs } = await import('firebase/firestore');

	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const requestsRef = collection(db, 'insultRequests');

	let q;
	if (statusFilter) {
		q = query(requestsRef, where('status', '==', statusFilter), orderBy('createdAt', 'desc'));
	} else {
		q = query(requestsRef, orderBy('createdAt', 'desc'));
	}

	const querySnapshot = await getDocs(q);

	const requests: InsultRequest[] = [];
	querySnapshot.forEach((doc) => {
		const data = doc.data();
		requests.push({
			id: doc.id,
			text: data.text as string,
			status: asInsultRequestStatus(data.status),
			requestedByUid: data.requestedByUid,
			requestedByName: data.requestedByName,
			requestedByEmail: data.requestedByEmail,
			createdAt: data.createdAt?.toDate() || new Date(),
			reviewedAt: data.reviewedAt?.toDate(),
			reviewedByUid: data.reviewedByUid
		});
	});

	return requests;
};

export const approveInsultRequest = async (requestId: string): Promise<void> => {
	const { getFirestore, doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');

	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	await auth.authStateReady();
	const user = auth.currentUser;

	if (!user) {
		throw new Error('You must be logged in to approve requests.');
	}

	const requestRef = doc(db, 'insultRequests', requestId);

	await updateDoc(requestRef, {
		status: 'approved',
		reviewedAt: serverTimestamp(),
		reviewedByUid: user.uid
	});
};

export const rejectInsultRequest = async (requestId: string): Promise<void> => {
	const { getFirestore, doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
	const { getAuth } = await import('firebase/auth');

	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const auth = getAuth(app);
	await auth.authStateReady();
	const user = auth.currentUser;

	if (!user) {
		throw new Error('You must be logged in to reject requests.');
	}

	const requestRef = doc(db, 'insultRequests', requestId);

	await updateDoc(requestRef, {
		status: 'rejected',
		reviewedAt: serverTimestamp(),
		reviewedByUid: user.uid
	});
};

export const flushApprovedRequests = async (): Promise<number> => {
	const { getFirestore, collection, query, where, getDocs, deleteDoc, doc } = await import('firebase/firestore');

	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const requestsRef = collection(db, 'insultRequests');

	const q = query(requestsRef, where('status', '==', 'approved'));
	const querySnapshot = await getDocs(q);

	const deletePromises: Promise<void>[] = [];
	querySnapshot.forEach((docSnapshot) => {
		const docRef = doc(db, 'insultRequests', docSnapshot.id);
		deletePromises.push(deleteDoc(docRef));
	});

	await Promise.all(deletePromises);

	return deletePromises.length;
};

export const getInsultRequestStats = async () => {
	const { getFirestore, collection, query, where, getCountFromServer } = await import('firebase/firestore');

	const app = await getFirebaseApp();
	const db = getFirestore(app);
	const requestsRef = collection(db, 'insultRequests');

	const pendingQuery = query(requestsRef, where('status', '==', 'pending'));
	const approvedQuery = query(requestsRef, where('status', '==', 'approved'));
	const rejectedQuery = query(requestsRef, where('status', '==', 'rejected'));

	const [pendingSnapshot, approvedSnapshot, rejectedSnapshot] = await Promise.all([
		getCountFromServer(pendingQuery),
		getCountFromServer(approvedQuery),
		getCountFromServer(rejectedQuery)
	]);

	return {
		pending: pendingSnapshot.data().count,
		approved: approvedSnapshot.data().count,
		rejected: rejectedSnapshot.data().count
	};
};
