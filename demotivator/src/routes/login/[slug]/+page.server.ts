import type { InsultDBQueryResponse } from "../../../typescript/types";
import type { PageServerLoad } from "./$types";


export const load = (async ({ params }): Promise<InsultDBQueryResponse> => {
  const { getFirestore, doc, getDoc } = await import("firebase/firestore");
  const { initializeApp } = await import("firebase/app");
  const { getAuth } = await import("firebase/auth");
  const { firebaseConfig } = await import("../../../typescript/insults");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  let d
  try {
    const user = await auth.currentUser
    if (user !== null) {
      const usersRef = doc(db, "users", user.uid || params.slug);
        const usersSnap = await getDoc(usersRef);
        if (usersSnap.exists()) {
          let data: InsultDBQueryResponse = usersSnap.data();
          if (typeof data.insultsSeen === "number") {
            d = data.insultsSeen;
          } else {
            d = null
          }
        }
    }
  } catch (e) {
    return e as Error
  }
  return {
    insultsSeen: d
  } as InsultDBQueryResponse;
}) satisfies PageServerLoad;
