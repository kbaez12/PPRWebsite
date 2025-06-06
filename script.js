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

// Replace your existing carousel-related code with the following.
// This handles both desktop (3 slides visible) and mobile (1 slide visible)
// without affecting your current mobile logic.

document.addEventListener("DOMContentLoaded", function() {
  const slidesContainer = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.nav-arrow.prev');
  const nextBtn = document.querySelector('.nav-arrow.next');
  let currentIndex = 0;

  function updateCarousel() {
    // Make sure we have slides and a container
    if (!slidesContainer || slides.length === 0) return;

    // Measure one “step”: slide width + gap
    const firstSlide = slides[0];
    const firstRect = firstSlide.getBoundingClientRect();
    const slideWidth = firstRect.width;

    // Read the gap from computed styles of .slides
    const style = window.getComputedStyle(slidesContainer);
    const gap = parseInt(style.getPropertyValue('gap')) || 0;
    const step = slideWidth + gap;

    // Determine how many slides should be visible
    const isMobile = window.innerWidth <= 1024;
    const visibleCount = isMobile ? 1 : 3;

    // Compute the maximum index (so we never scroll past the last “page”)
    const maxIndex = slides.length - visibleCount;

    // Clamp currentIndex between 0 and maxIndex
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    // Apply translateX
    slidesContainer.style.transform = `translateX(-${currentIndex * step}px)`;

    // Optionally disable arrows at the ends
    if (prevBtn) prevBtn.disabled = (currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentIndex === maxIndex);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      updateCarousel();
    });
  }

  // Recompute on resize (so visibleCount can switch between 3 and 1)
  window.addEventListener('resize', updateCarousel);

  // Initial positioning
  updateCarousel();
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
