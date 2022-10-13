<!-- Auth.svelte -->

<script>
    import '../../app.css'
    import '../../cursor.css'
    import Title from '../../components/title.svelte';
    import '@capacitor/core'
    // Loading Logic



    // FROM BEYOND THIS POINT IS FIREBASE LOGIC
    // BEWARE


import { initializeApp } from "firebase/app";
import { getAnalytics, setUserId } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",
  authDomain: "demotivator-3cf4d.firebaseapp.com",
  projectId: "demotivator-3cf4d",
  storageBucket: "demotivator-3cf4d.appspot.com",
  messagingSenderId: "230067629772",
  appId: "1:230067629772:web:682830de35cc6b7be91c69",
  measurementId: "G-T182ZXMZM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getAuth } from "firebase/auth";
const auth = getAuth();
  
    // Firebase user
    let user = null;
  
    // expose property on the component that we can use
    // to choose if we want use popup or redirect
    export let useRedirect = false;
  
    // small mapper function
    const userMapper = claims => ({
      id: claims.user_id,
      name: claims.name,
      email: claims.email,
      picture: claims.picture
    });
  
    export const loginWithEmailPassword = async (email, password) => {
      const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth")
      signInWithEmailAndPassword(auth, email, password);
    }
    export const loginWithGoogle = async () => {
      const { signInWithPopup, signInWithRedirect, GoogleAuthProvider } = await import("firebase/auth")
      const provider = new GoogleAuthProvider();
      if (useRedirect) {
        return signInWithRedirect(auth, provider);
      } else {
        return signInWithPopup(auth, provider);
      }
    };
  
    export const logout = () => auth.signOut();
  
    // will be fired every time auth state changes
    auth.onAuthStateChanged(async fireUser => {
      if (fireUser) {
        // in here you might want to do some further actions
        // such as loading more data, etc.
  
        // if you want to set custom claims such as roles on a user
        // this is how to get them because they will be present
        // on the token.claims object
        const token = await fireUser.getIdTokenResult();
        user = userMapper(token.claims);
      } else {
        user = null;
      }
    });
  
    // reactive helper variable
    $: loggedIn = user !== null;
  </script>
  
  <!-- we will expose all required methods and properties on our slot -->
  <div>
    <slot {user} {loggedIn} {loginWithGoogle} {loginWithEmailPassword} {logout} />
  </div>