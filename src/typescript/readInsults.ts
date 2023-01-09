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
      const user = await auth.currentUser;
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
      reject(error);
    }
  });
}
