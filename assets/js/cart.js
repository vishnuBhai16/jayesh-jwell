import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= LOAD CART =================
const cartContainer = document.getElementById("cartItems");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.qty;

    cartContainer.innerHTML += `
      <div class="product-card">
        <img src="${item.image}">
        <div class="product-info">
          <h3>${item.name}</h3>
          <p>Qty: ${item.qty}</p>
          <strong>₹${item.price * item.qty}</strong>
        </div>
      </div>
    `;
  });

  cartContainer.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

renderCart();

// ================= PLACE ORDER =================
const form = document.getElementById("checkoutForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const order = {
    customer: {
      name: name.value,
      email: email.value,
      phone: phone.value,
      address: address.value
    },
    items: cart,
    status: "Pending",
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "orders"), order);

    localStorage.removeItem("cart");
    alert("Order placed successfully 🎉");

    window.location.href = "index.html";

  } catch (error) {
    console.error(error);
    alert("Order failed");
  }
});
