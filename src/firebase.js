import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import storage module 

const firebaseConfig = {


};

const app = initializeApp(firebaseConfig);
export const firestore_db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Initialize Firebase Storage

export default app;