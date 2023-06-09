import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { GlobInsultDBQueryResponse, type InsultDBQueryResponse  } from "./types";
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

export let leaderboard: GlobInsultDBQueryResponse[] = []

export async function getListOfAllUsersWhoHaveSeenInsults(): Promise<QuerySnapshot<DocumentData>> {
  leaderboard = []
  const { getFirestore, getDocs, collection, where, query  } = await import("firebase/firestore");
  const { initializeApp } = await import("firebase/app");
  const { firebaseConfig } = await import("./insults");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const usersCollectionRef = collection(db, "users");
  const querySnapshot = await getDocs(query(usersCollectionRef, where("insultsSeen", ">", 0)));
  querySnapshot.forEach((doc) => leaderboard.push({
    referrer: doc.id,
    data: doc.data().insultsSeen
  }))
  leaderboard.sort((a, b) => a.data - b.data).reverse()
  console.log("SCOREBOARD: ", leaderboard)
  return querySnapshot
}

