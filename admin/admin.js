import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 Firebase Config (YOUR REAL CONFIG) */
const firebaseConfig = {
  apiKey: "AIzaSyCEaKztsNBTIMrC0Tg48uHvBaij1oSWjWk",
  authDomain: "rnwm-f8750.firebaseapp.com",
  projectId: "rnwm-f8750",
  storageBucket: "rnwm-f8750.firebasestorage.app",
  messagingSenderId: "527692827816",
  appId: "1:527692827816:web:b84b87ea5ceb3f17bec69d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* 🔗 FORM ELEMENTS (IMPORTANT FIX) */
const form = document.getElementById("productForm");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");
const imageInput = document.getElementById("image");
const descriptionInput = document.getElementById("description");

const productsList = document.getElementById("productsList");

/* ➕ ADD PRODUCT */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: nameInput.value.trim(),
    price: Number(priceInput.value),
    category: categoryInput.value,
    image: imageInput.value.trim(),
    description: descriptionInput.value.trim(),
    createdAt: Date.now()
  };

  await addDoc(collection(db, "products"), product);

  form.reset();
  loadProducts();
});

/* 📦 LOAD PRODUCTS */
async function loadProducts() {
  productsList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.forEach((docSnap) => {
    const p = docSnap.data();

    productsList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <small>${p.category}</small>
        <button onclick="deleteProduct('${docSnap.id}')">Delete</button>
      </div>
    `;
  });
}

/* ❌ DELETE PRODUCT */
window.deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
  loadProducts();
};

/* 🚀 INIT */
loadProducts();
