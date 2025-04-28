// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD03rB5o9oCyvMGsVF5fPctNmXv4wo-94Q",
  authDomain: "text-image-generator-01.firebaseapp.com",
  projectId: "text-image-generator-01",
  storageBucket: "text-image-generator-01.firebasestorage.app",
  messagingSenderId: "660453013865",
  appId: "1:660453013865:web:9a4d1d842159c497a3e5f8",
  measurementId: "G-25FYCQGQYB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
