<!-- Auth.svelte -->

<script lang="ts">
    import '../../styles/css/app.css'
    import '../../styles/css/customProps.css'
    import '../../styles/scss/colorScheme.scss'
    import '@capacitor/core'
    // Loading Logic



    // FROM BEYOND THIS POINT IS FIREBASE LOGIC
    // BEWARE


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {firebaseConfig} from '../../typescript/insults'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// @ts-ignore
const analytics = getAnalytics(app);
import { getAuth, ParsedToken } from "firebase/auth";
const auth = getAuth();
  
    // Firebase user
    let user: { user_id?: string; id?: string; name?: string; email?: string; picture?: string; } | null = null;
  
    // expose property on the component that we can use
    // to choose if we want use popup or redirect
    export let useRedirect = false;
  
    // small mapper function
    const userMapper = (claims: ParsedToken) => ({
      id: claims.user_id,
      name: claims.name,
      email: claims.email,
      picture: claims.picture
    });
  
    export const loginWithEmailPassword = async (email: string, password: string) => {
      const { signInWithEmailAndPassword } = await import("firebase/auth")
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
    export const signInAnonomous = async () => {
      const { getAuth, signInAnonymously } = await import("firebase/auth");
      const auth = getAuth();
      signInAnonymously(auth)
      .then(() => {
        console.log(`your anonomous user ID is ${user?.user_id}`);
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`
      
        An error occured.
        Here are the detials:
        ${errorCode}
        ${errorMessage}
      `)
      // ...
      });
    }
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
  
    // reactive helper variable(s)
    $: loggedIn = user !== null;
  </script>
  
  <!-- we will expose all required methods and properties on our slot -->
  <div>
    <slot {user} {loggedIn} {loginWithGoogle} {loginWithEmailPassword} {signInAnonomous} {logout}>Error fetching Login API. Sorry about that :(</slot>
  </div>