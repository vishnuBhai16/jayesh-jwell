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
