import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcttBbx9PWQCwrB22rajV7CBYR8-hu5HI",
  authDomain: "ko-nawin.firebaseapp.com",
  projectId: "ko-nawin",
  storageBucket: "ko-nawin.firebasestorage.app",
  messagingSenderId: "965233762003",
  appId: "1:965233762003:web:4c62f4acea258b388afe26",
  measurementId: "G-X6JYEXTGGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
