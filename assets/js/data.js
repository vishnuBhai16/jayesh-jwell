window.onload = function() {
    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyDlT5g-Q_fqE-tKJ0AOoXsIxaAiwdZBYrk",
      authDomain: "rnwm-a0d96.firebaseapp.com",
      projectId: "rnwm-a0d96",
      storageBucket: "rnwm-a0d96.firebasestorage.app",
      messagingSenderId: "323887092612",
      appId: "1:323887092612:web:dbe7bba1925c0b02c8c3d1",
      measurementId: "G-9KL9ENX86Z"
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
  
    // Function to fetch & export data
    async function exportData(filter = "all") {
      try {
        let snapshot;
  
        if (filter === "all") {
          snapshot = await db.collection("enquiries").get();
        } else if (filter === "date") {
          const startInput = document.getElementById("startDate").value;
          const endInput = document.getElementById("endDate").value;
          if (!startInput || !endInput) {
            alert("Please select both start and end dates!");
            return;
          }
          const startDate = new Date(startInput);
          const endDate = new Date(endInput + "T23:59:59");
          snapshot = await db.collection("enquiries")
            .where("createdAt", ">=", firebase.firestore.Timestamp.fromDate(startDate))
            .where("createdAt", "<=", firebase.firestore.Timestamp.fromDate(endDate))
            .get();
        }
  
        const data = [];
        snapshot.forEach(doc => {
          const d = doc.data();
          data.push({
            Name: d.name || "",
            Email: d.email || "",
            Mobile: d.mobile || "",
            Message: d.message || "",
            Date: d.createdAt ? d.createdAt.toDate().toLocaleString() : ""
          });
        });
  
        if (data.length === 0) {
          alert("No data found for selected criteria!");
          return;
        }
  
        // Export to Excel
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
        XLSX.writeFile(wb, "Enquiries.xlsx");
  
      } catch (err) {
        console.error(err);
        alert("Error fetching data. Check console.");
      }
    }
  
    // Attach buttons (SES-safe)
    document.getElementById("exportAllBtn").addEventListener("click", () => exportData("all"));
    document.getElementById("exportDateBtn").addEventListener("click", () => exportData("date"));
  };
  