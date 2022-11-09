import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyBXQIdxhaZk2jEh7Kgkui4OG0WUsIHyWgk",
    authDomain: "demotivator-3cf4d.firebaseapp.com",
    projectId: "demotivator-3cf4d",
    storageBucket: "demotivator-3cf4d.appspot.com",
    messagingSenderId: "230067629772",
    appId: "1:230067629772:web:682830de35cc6b7be91c69",
    measurementId: "G-T182ZXMZM1"
};

// Initialize Firebase
// @ts-ignore
const app = initializeApp(firebaseConfig);
import { getAuth } from "firebase/auth";
import { Insult } from "./types";
import { FirebaseConfig } from "./types";
const auth = getAuth();
const user = auth.currentUser;
export const userInsults: Insult[] = [
    `If there was ever one person who I hated the most, it would be ${user?.displayName ?? "this guest user"}`,
    `I heard ${user?.displayName ?? "this guest user"} is a really bad person`,
    `I would give you an insult, but I think ${user?.displayName ?? "this guest user"} is too self-righteous to hear it`,
    `${user?.displayName ?? "this guest user"} is the worst person I know`,
    `If there would ever be just a sterotypical stupid person, it would be ${user?.displayName ?? "this guest user"}`,
    `What if ${user?.displayName ?? "this guest user"} was a real person?`,
    `Can you walk to the bathroom and tell me how ${user?.displayName ?? "this guest user"} is feeling? I heard he's crying in there`,
    `${user?.displayName ?? "this guest user"} is the worst person I know`,
    `Today, we come to mourn the death of ${user?.displayName ?? "this guest user"}`,
    `Today, I have to tell you how ${user?.displayName ?? "this guest user"} is a bad person`,
    `${user?.displayName ?? "this guest user"} is the worst person I know`,
    `It's sad to see ${user?.displayName ?? "this guest user"}. Thats it. I'm just going to leave.`,
    `${user?.displayName ?? "this guest user"}'s personality is about as interesting as a burnt match`,
    `I wouldn't trust ${user?.displayName ?? "this guest user"} with a blade of grass`,
    `It must have been raining when ${user?.displayName ?? "this guest user"} was born`,
    `${user?.displayName ?? "this guest user"} is so ugly, even their mom is jealous`,
    `${user?.displayName ?? "this guest user"} is so vile.`
]