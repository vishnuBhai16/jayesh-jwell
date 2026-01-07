// 🔥 Firebase Config (REAL – YOUR PROJECT)
firebase.initializeApp({
  apiKey: "AIzaSyDlT5g-Q_fqE-tKJ0AOoXsIxaAiwdZBYrk",
  authDomain: "rnwm-a0d96.firebaseapp.com",
  projectId: "rnwm-a0d96",
  storageBucket: "rnwm-a0d96.appspot.com",
  messagingSenderId: "323887092612",
  appId: "1:323887092612:web:dbe7bba1925c0b02c8c3d1"
});

// Firestore reference
const db = firebase.firestore();

// Table body
const tbody = document.getElementById("dataBody");

// -------------------------
// Utilities
// -------------------------
function clearTable() {
  tbody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align:center;">Loading...</td>
    </tr>
  `;
}

function noData() {
  tbody.innerHTML = `
    <tr>
      <td colspan="6" style="text-align:center;">No data found</td>
    </tr>
  `;
}

// -------------------------
// Render Row
// -------------------------
function renderDoc(doc) {
  const d = doc.data();
  const tr = document.createElement("tr");

  const date = d.createdAt
    ? d.createdAt.toDate().toLocaleString()
    : "N/A";

  tr.innerHTML = `
    <td>${d.name || "-"}</td>
    <td>${d.email || "-"}</td>
    <td>${d.mobile || "-"}</td>
    <td>${d.message || "-"}</td>
    <td>${date}</td>
    <td>
      <button class="delete-btn">Delete</button>
    </td>
  `;

  // Delete handler
  tr.querySelector(".delete-btn").onclick = async () => {
    if (!confirm("Delete this enquiry?")) return;

    try {
      await db.collection("enquiries").doc(doc.id).delete();
      tr.remove();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  tbody.appendChild(tr);
}

// -------------------------
// Load All Data
// -------------------------
document.getElementById("loadAllBtn").onclick = async () => {
  clearTable();

  try {
    const snap = await db
      .collection("enquiries")
      .orderBy("createdAt", "desc")
      .get();

    tbody.innerHTML = "";

    if (snap.empty) {
      noData();
      return;
    }

    snap.forEach(renderDoc);
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="6">Error loading data</td></tr>`;
  }
};

// -------------------------
// Filter by Date
// -------------------------
document.getElementById("filterBtn").onclick = async () => {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;

  if (!start || !end) {
    alert("Select both start and end date");
    return;
  }

  clearTable();

  const startDate = new Date(start);
  const endDate = new Date(end);
  endDate.setHours(23, 59, 59, 999);

  try {
    const snap = await db
      .collection("enquiries")
      .where(
        "createdAt",
        ">=",
        firebase.firestore.Timestamp.fromDate(startDate)
      )
      .where(
        "createdAt",
        "<=",
        firebase.firestore.Timestamp.fromDate(endDate)
      )
      .orderBy("createdAt", "desc")
      .get();

    tbody.innerHTML = "";

    if (snap.empty) {
      noData();
      return;
    }

    snap.forEach(renderDoc);
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="6">Error filtering data</td></tr>`;
  }
};

// -------------------------
// Auto load all on page load
// -------------------------
document.getElementById("loadAllBtn").click();
// 📄 Download table as PDF
document.getElementById("pdfBtn").onclick = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("l", "pt", "a4");

  doc.text("Enquiries Report", 40, 40);

  doc.autoTable({
    html: "#dataTable",
    startY: 60,
    styles: {
      fontSize: 8,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [34, 34, 34],
      textColor: 255,
    },
    columnStyles: {
      5: { cellWidth: 60 } // Action column
    }
  });

  doc.save("enquiries.pdf");
};

