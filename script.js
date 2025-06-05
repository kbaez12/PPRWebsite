// Blur the hero image on scroll (safe on any page)
window.addEventListener("scroll", () => {
  const heroImage = document.querySelector(".hero-image");
  if (!heroImage) return;
  const blurValue = Math.min(window.scrollY / 50, 8); // max 8px blur
  heroImage.style.filter = `blur(${blurValue}px)`;
});

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    document.querySelector('.top-header').classList.add('hide-top-header');
    document.body.classList.add('scrolled');
  } else {
    document.querySelector('.top-header').classList.remove('hide-top-header');
    document.body.classList.remove('scrolled');
  }
});

// Wait for DOM ready before wiring carousel + modals
document.addEventListener("DOMContentLoaded", function() {
  // ——— Carousel setup (only if present) ———
  const slides     = document.querySelector('.slides');
  const slideItems = document.querySelectorAll('.slide');
  const prevBtn    = document.querySelector('.prev');
  const nextBtn    = document.querySelector('.next');
  let currentIndex = 0;

  if (slides && prevBtn && nextBtn) {
    // Next arrow
    nextBtn.addEventListener('click', () => {
      if (currentIndex < slideItems.length - 3) {
        currentIndex++;
        slides.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
      }
    });

    // Prev arrow
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        slides.style.transform = `translateX(-${currentIndex * (100 / 2)}%)`;
      }
    });
  }

  // ——— Modal wiring ———
  // Carousel images
  document.querySelectorAll(".slide img").forEach((img, idx) => {
    img.addEventListener("click", () => {
      openModal(`imageModal${idx + 1}`);
    });
  });

  // Portfolio grid images
document.querySelectorAll(".portfolio-grid .grid-item").forEach((item, idx) => {
  item.addEventListener("click", () => {
    openModal(`imageModal${idx + 1}`);
  });
});

  // “X” buttons inside modals
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener("click", function() {
      const modalId = this.getAttribute('data-modal');
      closeModal(modalId);
    });
  });

  // Click outside modal-content to close
  window.addEventListener("click", event => {
    if (
      event.target.classList &&
      event.target.classList.contains("modal")
    ) {
      event.target.style.display = "none";
    }
  });
});

// Show a given modal (hides any others first)
function openModal(modalId) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = "none");
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "block";
}

// Hide a given modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "none";
}

// Hamburger off-canvas toggle
const navToggle = document.querySelector('.nav-toggle');
const offcanvas = document.querySelector('.offcanvas-menu');

navToggle.addEventListener('click', () => {
  offcanvas.classList.toggle('open');
});

// script.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".nav-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  toggleButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("open");
  });
});

// At the bottom of script.js, if not already present:
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".interest-form");
  const replyToField = document.getElementById("replyto-field");
  if (form && replyToField) {
    form.addEventListener("submit", function () {
      const userEmail = document.getElementById("contactInfo").value.trim();
      replyToField.value = userEmail;
    });
  }
});
