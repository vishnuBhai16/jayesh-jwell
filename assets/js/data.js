// Import Firebase modules (npm installed)
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlT5g-Q_fqE-tKJ0AOoXsIxaAiwdZBYrk",
  authDomain: "rnwm-a0d96.firebaseapp.com",
  projectId: "rnwm-a0d96",
  storageBucket: "rnwm-a0d96.firebasestorage.app",
  messagingSenderId: "323887092612",
  appId: "1:323887092612:web:dbe7bba1925c0b02c8c3d1",
  measurementId: "G-9KL9ENX86Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tableBody = document.querySelector("#enquiriesTable tbody");

// Render table rows
function renderData(docs) {
  tableBody.innerHTML = "";
  if (!docs || docs.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No entries found</td></tr>`;
    return;
  }

  docs.forEach((doc) => {
    const d = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.name || ""}</td>
      <td>${d.email || ""}</td>
      <td>${d.mobile || ""}</td>
      <td>${d.message || ""}</td>
      <td>${d.createdAt ? d.createdAt.toDate().toLocaleString() : ""}</td>
    `;
    tableBody.appendChild(tr);
  });
}

// Fetch all entries
async function fetchAll() {
  try {
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    renderData(snapshot.docs);
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">Error fetching data</td></tr>`;
  }
}

// Fetch entries by date
async function fetchByDate() {
  const startInput = document.getElementById("startDate").value;
  const endInput = document.getElementById("endDate").value;

  if (!startInput || !endInput) {
    alert("Please select both start and end dates!");
    return;
  }

  const startDate = new Date(startInput);
  const endDate = new Date(endInput + "T23:59:59"); // Include full day

  try {
    const q = query(
      collection(db, "enquiries"),
      where("createdAt", ">=", Timestamp.fromDate(startDate)),
      where("createdAt", "<=", Timestamp.fromDate(endDate)),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    renderData(snapshot.docs);
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">Error fetching data</td></tr>`;
  }
}

// Attach buttons
const showAllBtn = document.getElementById("showAllBtn");
const filterBtn = document.getElementById("filterBtn");

if (showAllBtn) showAllBtn.addEventListener("click", fetchAll);
if (filterBtn) filterBtn.addEventListener("click", fetchByDate);

// Load all entries by default
fetchAll();
