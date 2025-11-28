// js/firebase-config.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// PASTE YOUR CONFIG HERE (Replace the X's with your actual code from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyD-xxxxxx",
  authDomain: "lokal-cafe-app.firebaseapp.com",
  projectId: "lokal-cafe-app",
  storageBucket: "lokal-cafe-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export 'db' so other files can use it
export { db };
