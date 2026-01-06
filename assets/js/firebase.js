// ================= FIREBASE CORE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// ================= FIRESTORE =================
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= ANALYTICS (OPTIONAL) =================
import {
  getAnalytics,
  isSupported
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// 🔥 FIREBASE CONFIG (UPDATED PROJECT)
const firebaseConfig = {
  apiKey: "AIzaSyDlT5g-Q_fqE-tKJ0AOoXsIxaAiwdZBYrk",
  authDomain: "rnwm-a0d96.firebaseapp.com",
  projectId: "rnwm-a0d96",
  storageBucket: "rnwm-a0d96.firebasestorage.app",
  messagingSenderId: "323887092612",
  appId: "1:323887092612:web:dbe7bba1925c0b02c8c3d1",
  measurementId: "G-9KL9ENX86Z"
};

// ================= INITIALIZE APP =================
const app = initializeApp(firebaseConfig);

// ✅ THIS MUST EXIST
export const db = getFirestore(app);

// ================= OPTIONAL ANALYTICS =================
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});
