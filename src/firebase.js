// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc1oT4q-VB2Ug_xnR6H-SMwyJ39N8nTBM",
  authDomain: "campusbuddy-f0f09.firebaseapp.com",
  projectId: "campusbuddy-f0f09",
  storageBucket: "campusbuddy-f0f09.firebasestorage.app",
  messagingSenderId: "711385413700",
  appId: "1:711385413700:web:92c1d9d98642848726e411",
  measurementId: "G-HXJ09NLNY1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);