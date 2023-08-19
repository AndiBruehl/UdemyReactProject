import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import storage module 

const firebaseConfig = {
    apiKey: "AIzaSyArP2C6y6Rwn-IaOmTnLgz-WbOW6virpEk",
    authDomain: "dashboard-eaa27.firebaseapp.com",
    projectId: "dashboard-eaa27",
    storageBucket: "dashboard-eaa27.appspot.com",
    messagingSenderId: "1350542863",
    appId: "1:1350542863:web:bd9e472611489b8bd1a57a",
    measurementId: "G-TBVG6G750P"
};

const app = initializeApp(firebaseConfig);
export const firestore_db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Initialize Firebase Storage

export default app;