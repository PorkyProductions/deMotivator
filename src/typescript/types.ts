import { type DocumentData } from "firebase/firestore";

export type bool = boolean
export type Insult = string

export type BSVarient = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"


export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

export interface _Insult {
    length: number,
    name: string,
    mean?: bool
}

export interface _UserInsult extends _Insult {containsUser: bool}


export interface InsultDBQueryResponse extends DocumentData {
    data?: number
}