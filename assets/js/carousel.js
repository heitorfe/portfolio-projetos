// JavaScript for infinite carousel functionality

function initCarousel() {
  const track = document.querySelector(".carousel-track");
  const container = document.querySelector(".carousel-container");

  if (!track || !container) {
    return;
  }

  // Get only original cards (not clones)
  const originalCards = track.querySelectorAll(".carousel-card:not(.cloned)");

  // Remove any existing clones first (in case of re-initialization)
  track.querySelectorAll(".carousel-card.cloned").forEach(clone => clone.remove());

  // Clone cards to create the infinite loop effect
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.classList.add("cloned");
    track.appendChild(clone);
  });

  // Pause animation on hover (remove old listeners first by replacing element)
  const newContainer = container.cloneNode(false);
  while (container.firstChild) {
    newContainer.appendChild(container.firstChild);
  }
  container.parentNode.replaceChild(newContainer, container);

  newContainer.addEventListener("mouseenter", () => {
    const currentTrack = newContainer.querySelector(".carousel-track");
    if (currentTrack) currentTrack.style.animationPlayState = "paused";
  });

  newContainer.addEventListener("mouseleave", () => {
    const currentTrack = newContainer.querySelector(".carousel-track");
    if (currentTrack) currentTrack.style.animationPlayState = "running";
  });
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
});

// Expose globally for shared-loader.js
window.initCarousel = initCarousel;