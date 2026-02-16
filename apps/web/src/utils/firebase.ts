import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signInAnonymously, GoogleAuthProvider } from 'firebase/auth';
import { firebaseConfig } from '../typescript/insults';

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Auth
const auth = getAuth(app);

// Export instances
import type { IdTokenResult, User as FirebaseUser } from 'firebase/auth';

export { app, analytics, auth };

// User type
export interface AppUser {
	id: string;
	name: string;
	email: string;
	picture: string;
}

// User mapper function - converts Firebase claims to our user format
export const userMapper = (claims: IdTokenResult['claims']): AppUser => ({
	id: claims.user_id as string,
	name: claims.name as string,
	email: claims.email as string,
	picture: claims.picture as string
});

// Auth helper functions
export const loginWithEmailPassword = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = (useRedirect = false) => {
	const provider = new GoogleAuthProvider();
	if (useRedirect) {
		return signInWithRedirect(auth, provider);
	} else {
		return signInWithPopup(auth, provider);
	}
};

export const signInAnonymous = () => {
	return signInAnonymously(auth);
};

export const logout = () => auth.signOut();

// Setup auth state change listener
export const onAuthStateChanged = (callback: (user: AppUser | null) => void) => {
	return auth.onAuthStateChanged(async (fireUser: FirebaseUser | null) => {
		if (fireUser) {
			const token = await fireUser.getIdTokenResult();
			callback(userMapper(token.claims));
		} else {
			callback(null);
		}
	});
};
