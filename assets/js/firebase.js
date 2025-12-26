// assets/js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCEaKztsNBTIMrC0Tg48uHvBaij1oSWjWk",
  authDomain: "rnwm-f8750.firebaseapp.com",
  projectId: "rnwm-f8750",
  storageBucket: "rnwm-f8750.firebasestorage.app",
  messagingSenderId: "527692827816",
  appId: "1:527692827816:web:b84b87ea5ceb3f17bec69d",
  measurementId: "G-038MRST4TW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
