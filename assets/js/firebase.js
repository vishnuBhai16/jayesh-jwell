// ================= FIREBASE CORE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// ================= FIRESTORE =================
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= ANALYTICS (OPTIONAL) =================
import {
  getAnalytics,
  isSupported
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// 🔥 FIREBASE CONFIG (DO NOT CHANGE)
const firebaseConfig = {
  apiKey: "AIzaSyCEaKztsNBTIMrC0Tg48uHvBaij1oSWjWk",
  authDomain: "rnwm-f8750.firebaseapp.com",
  projectId: "rnwm-f8750",
  storageBucket: "rnwm-f8750.firebasestorage.app",
  messagingSenderId: "527692827816",
  appId: "1:527692827816:web:b84b87ea5ceb3f17bec69d",
  measurementId: "G-038MRST4TW"
};

// ================= INITIALIZE APP =================
const app = initializeApp(firebaseConfig);

// ================= FIRESTORE INSTANCE =================
export const db = getFirestore(app);

// ================= OPTIONAL ANALYTICS =================
// Analytics works only on https or production domains
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});
