import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

    const submitBtn = form.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      await addDoc(collection(db, "enquiries"), {
        type: "contact",
        name,
        email,
        mobile: null,
        message,
        sourcePage: "contact",
        createdAt: serverTimestamp()
      });

      alert("Message sent successfully ✨");
      form.reset();

    } catch (err) {
      console.error("Contact Error:", err);
      alert("Something went wrong");

    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Message";
    }
  });
}
