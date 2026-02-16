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
export { app, analytics, auth };

// User mapper function - converts Firebase claims to our user format
export const userMapper = (claims: any) => ({
	id: claims.user_id,
	name: claims.name,
	email: claims.email,
	picture: claims.picture
});

// Auth helper functions
export const loginWithEmailPassword = async (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async (useRedirect = false) => {
	const provider = new GoogleAuthProvider();
	if (useRedirect) {
		return signInWithRedirect(auth, provider);
	} else {
		return signInWithPopup(auth, provider);
	}
};

export const signInAnonymous = async () => {
	return signInAnonymously(auth);
};

export const logout = () => auth.signOut();

// Setup auth state change listener
export const onAuthStateChanged = (callback: (user: any) => void) => {
	return auth.onAuthStateChanged(async (fireUser) => {
		if (fireUser) {
			const token = await fireUser.getIdTokenResult();
			callback(userMapper(token.claims));
		} else {
			callback(null);
		}
	});
};
