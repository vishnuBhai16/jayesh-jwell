// ================= FAQ ACCORDION =================
document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");
  
    questions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector(".faq-answer");
        const icon = question.querySelector("span");
  
        // Close other open FAQs (optional but premium UX)
        document.querySelectorAll(".faq-item").forEach((item) => {
          if (item !== faqItem) {
            item.classList.remove("active");
            item.querySelector(".faq-answer").style.maxHeight = null;
            item.querySelector(".faq-question span").textContent = "+";
          }
        });
  
        // Toggle current FAQ
        faqItem.classList.toggle("active");
  
        if (faqItem.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          icon.textContent = "−";
        } else {
          answer.style.maxHeight = null;
          icon.textContent = "+";
        }
      });
    });
  });
  