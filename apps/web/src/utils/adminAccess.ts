import { writable } from 'svelte/store';

type AdminAccessState = {
	loading: boolean;
	isAuthenticated: boolean;
	isAdmin: boolean;
	error: Error | null;
	userId: string | null;
};

const createAdminAccessStore = () => {
	const { subscribe, set, update } = writable<AdminAccessState>({
		loading: true,
		isAuthenticated: false,
		isAdmin: false,
		error: null,
		userId: null
	});

	return {
		subscribe,
		set,
		update
	};
};

export const adminAccessStore = createAdminAccessStore();

export const checkAdminAccess = async (): Promise<AdminAccessState> => {
	try {
		adminAccessStore.update(state => ({ ...state, loading: true, error: null }));

		const { getAuth } = await import('firebase/auth');
		const { getFirestore, doc, getDoc } = await import('firebase/firestore');
		const { initializeApp, getApps, getApp } = await import('firebase/app');
		const { firebaseConfig } = await import('../typescript/insults');

		const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
		const auth = getAuth(app);
		const user = auth.currentUser;

		if (!user) {
			const state = {
				loading: false,
				isAuthenticated: false,
				isAdmin: false,
				error: null,
				userId: null
			};
			adminAccessStore.set(state);
			return state;
		}

		const db = getFirestore(app);
		const userRef = doc(db, 'users', user.uid);
		
		let isAdmin = false;
		try {
			const userSnap = await getDoc(userRef);
			isAdmin = userSnap.exists() && userSnap.data()?.admin === true;
		} catch (firestoreError) {
			console.warn('Could not check admin status (may be permissions issue):', firestoreError);
			isAdmin = false;
		}

		const state = {
			loading: false,
			isAuthenticated: true,
			isAdmin,
			error: null,
			userId: user.uid
		};
		adminAccessStore.set(state);
		return state;
	} catch (error) {
		console.error('Admin access check error:', error);
		const state = {
			loading: false,
			isAuthenticated: false,
			isAdmin: false,
			error: error as Error,
			userId: null
		};
		adminAccessStore.set(state);
		return state;
	}
};

export const initAdminAccessListener = () => {
	const setupListener = async () => {
		const { getAuth } = await import('firebase/auth');
		const { initializeApp, getApps, getApp } = await import('firebase/app');
		const { firebaseConfig } = await import('../typescript/insults');

		const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
		const auth = getAuth(app);

		auth.onAuthStateChanged(async (user) => {
			if (!user) {
				adminAccessStore.set({
					loading: false,
					isAuthenticated: false,
					isAdmin: false,
					error: null,
					userId: null
				});
			} else {
				await checkAdminAccess();
			}
		});
	};

	setupListener();
};
