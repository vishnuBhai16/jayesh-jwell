document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!hamburger || !mobileMenu) return;

  // Toggle menu
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("active");
    }
  });

  // Close menu on link click
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("active");
    });
  });
});
// ================= CART LOGIC =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart 🛒");
}
// ================= WHOLESALE ALERT =================
document.addEventListener("DOMContentLoaded", () => {
  const alertBox = document.getElementById("wholesaleAlert");
  const okBtn = document.getElementById("alertOkBtn");

  if (!alertBox || !okBtn) return;

  // Detect navigation type
  const navigationType = performance.getEntriesByType("navigation")[0]?.type;

  // If page was reloaded, reset alert flag
  if (navigationType === "reload") {
    sessionStorage.removeItem("wholesaleAlertShown");
  }

  // Check if alert already shown in this session
  const hasSeenAlert = sessionStorage.getItem("wholesaleAlertShown");
  if (hasSeenAlert) return;

  // Show alert
  setTimeout(() => {
    alertBox.classList.add("show");
  }, 300);

  // Auto hide after 10 seconds
  const autoHideTimer = setTimeout(() => {
    hideAlert();
  }, 10000);

  // OK button
  okBtn.addEventListener("click", hideAlert);

  function hideAlert() {
    alertBox.classList.remove("show");
    sessionStorage.setItem("wholesaleAlertShown", "true");
    clearTimeout(autoHideTimer);
  }
});



