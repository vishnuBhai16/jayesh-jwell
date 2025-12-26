// assets/js/contact.js

import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        message,
        createdAt: serverTimestamp()
      });

      alert("Message sent successfully ✨");
      form.reset();

    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
}
