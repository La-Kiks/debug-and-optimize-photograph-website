document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-item");
  const filters = document.querySelectorAll(".gallery-filters button");

  let currentIndex = 0;
  let filteredImages = [...images];

  // FILTER SYSTEM
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      filteredImages = [];

      images.forEach((img) => {
        if (filter === "all" || img.dataset.tag === filter) {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });
    });
  });

  // LIGHTBOX
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("lightbox-btn", "prev");
  prevBtn.setAttribute("aria-label", "Previous image");
  prevBtn.textContent = "❮";

  const lightboxImage = document.createElement("img");
  lightboxImage.classList.add("lightbox-image");
  lightboxImage.alt = "";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("lightbox-btn", "next");
  nextBtn.setAttribute("aria-label", "Next image");
  nextBtn.textContent = "❯";

  lightbox.appendChild(prevBtn);
  lightbox.appendChild(lightboxImage);
  lightbox.appendChild(nextBtn);

  document.body.appendChild(lightbox);

  images.forEach((img) => {
    img.addEventListener("click", () => {
      currentIndex = filteredImages.indexOf(img);
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.style.display = "flex";
    lightboxImage.src = filteredImages[currentIndex].src;
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    lightboxImage.src = filteredImages[currentIndex].src;
  }

  function showPrev() {
    currentIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    lightboxImage.src = filteredImages[currentIndex].src;
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.querySelector(".next").addEventListener("click", showNext);
  document.querySelector(".prev").addEventListener("click", showPrev);

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
  });
});
