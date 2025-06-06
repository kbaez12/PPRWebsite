// Blur the hero image on scroll (safe on any page)
window.addEventListener("scroll", () => {
  const heroImage = document.querySelector(".hero-image");
  if (!heroImage) return;
  const blurValue = Math.min(window.scrollY / 50, 8); // max 8px blur
  heroImage.style.filter = `blur(${blurValue}px)`;
});

// Hide top header once you scroll down
window.addEventListener("scroll", () => {
  const topHeader = document.querySelector('.top-header');
  if (!topHeader) return;
  if (window.scrollY > 50) {
    topHeader.classList.add('hide-top-header');
    document.body.classList.add('scrolled');
  } else {
    topHeader.classList.remove('hide-top-header');
    document.body.classList.remove('scrolled');
  }
});

// — CAROUSEL (index.html only) & MODAL hooks for both pages —
document.addEventListener("DOMContentLoaded", () => {
  //
  // 1) CAROUSEL SETUP
  //
  const slidesContainer = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.nav-arrow.prev');
  const nextBtn = document.querySelector('.nav-arrow.next');
  let currentIndex = 0;

  function updateCarousel() {
    if (!slidesContainer || slides.length === 0) return;

    // compute width + gap
    const { width: slideWidth } = slides[0].getBoundingClientRect();
    const gap = parseInt(getComputedStyle(slidesContainer).gap) || 0;
    const step = slideWidth + gap;

    // how many visible?
    const visibleCount = window.innerWidth <= 1024 ? 1 : 3;
    const maxIndex = Math.max(0, slides.length - visibleCount);

    // clamp
    currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex);

    // move
    slidesContainer.style.transform = `translateX(-${currentIndex * step}px)`;

    // disable arrows at ends
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === maxIndex;
  }

  // arrow clicks
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { currentIndex--; updateCarousel(); });
    nextBtn.addEventListener('click', () => { currentIndex++; updateCarousel(); });
  }

  // on resize & init
  window.addEventListener('resize', updateCarousel);
  updateCarousel();

  // 👉 NEW: clicking a slide opens its modal
  slides.forEach((slide, idx) => {
    slide.addEventListener("click", () => {
      openModal(`imageModal${idx + 1}`);
    });
  });


  //
  // 2) PORTFOLIO-GRID POPUPS (porfolio.html only)
  //
  document.querySelectorAll(".portfolio-grid .grid-item").forEach((item, idx) => {
    item.addEventListener("click", () => {
      openModal(`imageModal${idx + 1}`);
    });
  });


  //
  // 3) “X” BUTTONS INSIDE ALL MODALS
  //
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener("click", function() {
      closeModal(this.dataset.modal);
    });
  });

  // clicking outside the inner modal-content closes it, too
  window.addEventListener('click', event => {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });


  //
  // 4) NAV DROPDOWN (mobile)
  //
  const dropdownToggle = document.querySelector(".nav-toggle");
  const dropdownMenu   = document.querySelector(".dropdown-menu");
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", () => {
      dropdownMenu.classList.toggle("open");
    });
  }


  //
  // 5) FORMSPREE “reply-to” HOOK
  //
  const form = document.querySelector(".interest-form");
  const replyToField = document.getElementById("replyto-field");
  if (form && replyToField) {
    form.addEventListener("submit", () => {
      const userEmail = document.getElementById("contactInfo").value.trim();
      replyToField.value = userEmail;
    });
  }
});


// — MODAL OPEN/CLOSE FUNCTIONS (hoisted) —
function openModal(modalId) {
  // hide all first
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  const m = document.getElementById(modalId);
  if (m) m.style.display = 'block';
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.style.display = 'none';
}


// — OFF-CANVAS MENU (if you still use .offcanvas-menu) —
const navToggle = document.querySelector('.nav-toggle');
const offcanvas = document.querySelector('.offcanvas-menu');
if (navToggle && offcanvas) {
  navToggle.addEventListener('click', () => {
    offcanvas.classList.toggle('open');
  });
}
