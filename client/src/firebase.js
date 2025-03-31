// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { auth } from 'firebase/app';
// import 'firebase/auth';



// // 2) Your existing Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyCbis3HGtY7xnlWw9Zd62b9UIJAL5CZxUE",
//   authDomain: "preferred-vending.firebaseapp.com",
//   projectId: "preferred-vending",
//   storageBucket: "preferred-vending.firebasestorage.app",
//   messagingSenderId: "1029745346328",
//   appId: "1:1029745346328:web:837c3a01f6bdbc57bdc06d",
//   measurementId: "G-J529GZFMDM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // 3) Initialize Firestore and EXPORT it
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export { auth };

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCbis3HGtY7xnlWw9Zd62b9UIJAL5CZxUE",
  authDomain: "preferred-vending.firebaseapp.com",
  projectId: "preferred-vending",
  storageBucket: "preferred-vending.firebasestorage.app",
  messagingSenderId: "1029745346328",
  appId: "1:1029745346328:web:837c3a01f6bdbc57bdc06d",
  measurementId: "G-J529GZFMDM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
