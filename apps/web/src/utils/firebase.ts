import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signInAnonymously, GoogleAuthProvider, sendPasswordResetEmail as firebaseSendPasswordResetEmail } from 'firebase/auth';
export const firebaseConfig = {
	apiKey: import.meta.env.VITE_FB_API_KEY,
	authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FB_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FB_APP_ID,
	measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID
} as const;

// Initialize Firebase app
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Auth
const auth = getAuth(app);

// Export instances
import type { User as FirebaseUser } from 'firebase/auth';

export { app, analytics, auth };

// User type
export interface AppUser {
	id: string;
	name: string;
	email: string;
	picture: string;
}

// User mapper function - converts Firebase user to our user format
export const userMapper = (fireUser: FirebaseUser): AppUser => ({
	id: fireUser.uid,
	name: fireUser.displayName ?? fireUser.email ?? '',
	email: fireUser.email ?? '',
	picture: fireUser.photoURL ?? ''
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

export const sendPasswordResetEmail = (email: string) => {
	return firebaseSendPasswordResetEmail(auth, email);
};

// Setup auth state change listener
export const onAuthStateChanged = (callback: (user: AppUser | null) => void) => {
	return auth.onAuthStateChanged((fireUser: FirebaseUser | null) => {
		if (fireUser) {
			callback(userMapper(fireUser));
		} else {
			callback(null);
		}
	});
};
