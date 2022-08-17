<script lang="ts">
    import { userInsults } from '../typescript/insults';
    import { insults } from 'demotivator'
    import logo from  '../img/dmv-logo.png';
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
}
let result = ""
const randomize = () => {
    if (user != null) {
        result = userInsults[Math.floor(Math.random() * userInsults.length)]
    } else if (user == null) {
        result = insults[Math.floor(Math.random() * insults.length)]
    }
}
</script>

<main>
    <img src={logo} alt="large, red button" on:click={randomize} class="p-4">
    <div class="sm:p-3 md:p-4 lg:p-5 xl:p-6"></div>
    <p class="text-center font-primary">{result}</p>
</main>

<style>
    img {
        width: 325px;
        display: block;
        margin: auto;
    }
</style>