// JavaScript for infinite carousel functionality
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".carousel-card");

  // Clone cards to create the infinite loop effect
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  // Pause animation on hover
  const container = document.querySelector(".carousel-container");
  container.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });

  container.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });
});