import type { InsultDBQueryResponse } from "../../../typescript/types";
import type { PageServerLoad } from "./$types";
async function readInsults(userID: string): Promise<number> {
  const { getFirestore, doc, getDoc } = await import("firebase/firestore");
  const { initializeApp } = await import("firebase/app");
  const { getAuth } = await import("firebase/auth");
  const { firebaseConfig } = await import("../../../typescript/insults");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  return new Promise(async (resolve, reject) => {
    try {
      const user = await auth.currentUser;
      if (user) {
        const usersRef = doc(db, "users", userID);
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

export const load = (async ({ params }) => {
  const insultsSeen = await readInsults(params.slug)
  return {
    insultsSeen: insultsSeen
  };
}) satisfies PageServerLoad;
