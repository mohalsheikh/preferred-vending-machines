// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1) Import Firestore
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// 2) Your existing Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCbis3HGtY7xnlWw9Zd62b9UIJAL5CZxUE",
  authDomain: "preferred-vending.firebaseapp.com",
  projectId: "preferred-vending",
  storageBucket: "preferred-vending.firebasestorage.app",
  messagingSenderId: "1029745346328",
  appId: "1:1029745346328:web:837c3a01f6bdbc57bdc06d",
  measurementId: "G-J529GZFMDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 3) Initialize Firestore and EXPORT it
export const db = getFirestore(app);
export const storage = getStorage(app);

