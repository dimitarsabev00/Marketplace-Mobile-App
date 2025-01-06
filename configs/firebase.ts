// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6WBYdNmOjIUhgt-0q6voBMQ12EEOs3pQ",
  authDomain: "marketplace-mobile-app-f6d81.firebaseapp.com",
  projectId: "marketplace-mobile-app-f6d81",
  storageBucket: "marketplace-mobile-app-f6d81.firebasestorage.app",
  messagingSenderId: "878351793714",
  appId: "1:878351793714:web:b730267abf71c4cc0a062b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
