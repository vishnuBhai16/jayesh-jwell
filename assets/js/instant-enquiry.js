import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const enquiry = document.getElementById("instantEnquiry");
  const popup = document.getElementById("enquiryPopup");
  const closeBtn = document.querySelector(".close-popup");

  const enqName = document.getElementById("enqName");
  const enqMobile = document.getElementById("enqMobile");
  const enqMessage = document.getElementById("enqMessage");
  const sendBtn = document.getElementById("sendEnquiry");

  if (!enquiry || !popup) return;

  // TEXT → LOGO TRANSITION
  setTimeout(() => {
    enquiry.classList.remove("enquiry-text");
    enquiry.classList.add("enquiry-logo");
    enquiry.innerHTML = "💬";
  }, 2200);

  /* OPEN POPUP */
  enquiry.onclick = () => {
    popup.style.display = "flex";
  };

  /* CLOSE POPUP */
  if (closeBtn) {
    closeBtn.onclick = () => {
      popup.style.display = "none";
    };
  }

  /* SEND ENQUIRY */
  if (sendBtn) {
    sendBtn.onclick = async () => {
      const name = enqName.value.trim();
      const mobile = enqMobile.value.trim();
      const message = enqMessage.value.trim();

      if (!name || !mobile) {
        alert("Please enter name and mobile number");
        return;
      }

      if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Enter a valid 10-digit mobile number");
        return;
      }

      try {
        await addDoc(collection(db, "enquiries"), {
          name,
          mobile,
          message,
          createdAt: serverTimestamp()
        });

        alert("Enquiry sent successfully ✨");

        enqName.value = "";
        enqMobile.value = "";
        enqMessage.value = "";

        popup.style.display = "none";

      } catch (error) {
        console.error("Enquiry Error:", error);
        alert("Something went wrong. Please try again.");
      }
    };
  }

});
