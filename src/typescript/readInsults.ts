import { QuerySnapshot } from "firebase/firestore";
import { type InsultDBQueryResponse  } from "./types";
export async function readInsults(): Promise<number> {
  const { getFirestore, doc, getDoc } = await import("firebase/firestore");
  const { initializeApp } = await import("firebase/app");
  const { getAuth } = await import("firebase/auth");
  const { firebaseConfig } = await import("./insults");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  return new Promise(async (resolve, reject) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const usersRef = doc(db, "users", user.uid);
        const usersSnap = await getDoc(usersRef);
        if (usersSnap.exists()) {
          let data: InsultDBQueryResponse = usersSnap.data();
          if (typeof data.insultsSeen === "number") {
            resolve(data.insultsSeen);
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    } catch (error) {
      const { printError } = await import("../utils/print"); 
      reject((error: Error) => printError(error));
    }
  });
}

export async function getListOfAllUsersWhoHaveSeenInsults(): Promise<QuerySnapshot<InsultDBQueryResponse>> {
  const { getFirestore, collection, query, where, getDocs } = await import("firebase/firestore");
  const { initializeApp } = await import("firebase/app");
  const { firebaseConfig } = await import("./insults");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return new Promise(async (resolve, reject) => {
    try {
      // get all of the users who have seen an insult and return them as an array
      const q = query(collection(db, "users"), where("insultsSeen", ">", 0));
      const querySnapshot = await getDocs(q);
      resolve(querySnapshot)
    } catch (error) {
      const { printError } = await import("../utils/print"); 
      reject((error: Error) => printError(error));
    }
  })
}
