export async function updateInsultsSeen(insultsSeen: number) {
  const { getFirestore, doc, setDoc } = await import("firebase/firestore");
  const { initializeApp } = await import("firebase/app");
  const { getAuth } = await import("firebase/auth");
  const { firebaseConfig } = await import("./insults");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const usersRef = doc(db, "users", user.uid);
      await setDoc(
        usersRef,
        {
          insultsSeen: insultsSeen,
        },
        {
          merge: true,
        }
      );
    } else {
    }
  });
}
