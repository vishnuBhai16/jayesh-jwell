// ================= IMPORT FIREBASE =================
import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= CART =================
window.addToCart = function (product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart 🛒");
};

// ================= LOAD PRODUCTS =================
async function loadProducts() {
  const container = document.getElementById("productGrid");

  if (!container) {
    console.error("productGrid not found");
    return;
  }

  const category = document.body.dataset.category;
  console.log("Category:", category);

  if (!category) {
    container.innerHTML = "<p>Category missing.</p>";
    return;
  }

  container.innerHTML = "<p>Loading...</p>";

  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", category)
    );

    const snapshot = await getDocs(q);
    console.log("Products found:", snapshot.size);

    if (snapshot.empty) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    container.innerHTML = "";

    snapshot.forEach(docSnap => {
      const p = docSnap.data();

      container.innerHTML += `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}" />

          <div class="product-info">
            <h3>${p.name}</h3>
            <p>${p.description || ""}</p>
            <div class="price">₹${p.price}</div>

            <button class="buy-btn" onclick='addToCart({
              id: "${docSnap.id}",
              name: "${p.name}",
              price: ${p.price},
              image: "${p.image}"
            })'>
              Add to Cart
            </button>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading products:", error);
    container.innerHTML = "<p>Error loading products.</p>";
  }
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", loadProducts);
