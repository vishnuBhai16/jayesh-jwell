import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const enquiry = document.getElementById("instantEnquiry");
const popup = document.getElementById("enquiryPopup");
const closeBtn = document.querySelector(".close-popup");

setTimeout(() => {
  enquiry.classList.remove("enquiry-text");
  enquiry.classList.add("enquiry-logo");
  enquiry.innerHTML = "💬";
}, 2200);

/* OPEN POPUP */
enquiry.onclick = () => {
  popup.style.display = "flex";
};

/* CLOSE */
closeBtn.onclick = () => {
  popup.style.display = "none";
};

/* SEND ENQUIRY */
document.getElementById("sendEnquiry").onclick = async () => {
  const name = enqName.value.trim();
  const mobile = enqMobile.value.trim();
  const message = enqMessage.value.trim();

  if (!name || !mobile) {
    alert("Please fill required fields");
    return;
  }

  await addDoc(collection(db, "enquiries"), {
    name,
    mobile,
    message,
    createdAt: serverTimestamp()
  });

  alert("Enquiry sent successfully ✨");
  popup.style.display = "none";
};
