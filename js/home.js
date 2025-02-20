const images = [
  {
    main: "/assets/thumb1.png",
    thumb1: "/assets/thumb2.png",
    thumb2: "/assets/thumb3.png",
  },
  {
    main: "/assets/thumb2.png",
    thumb1: "/assets/thumb3.png",
    thumb2: "/assets/thumb1.png",
  },
  {
    main: "/assets/thumb3.png",
    thumb1: "/assets/thumb1.png",
    thumb2: "/assets/thumb2.png",
  },
];

let index = 0;

function createDots() {
  const paginationContainer = document.getElementById("pagination-dots");
  paginationContainer.innerHTML = "";

  images.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === index) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    paginationContainer.appendChild(dot);
  });
}

function updateSlide() {
  document.getElementById("main-slide").src = images[index].main;
  document.getElementById("thumb1").src = images[index].thumb1;
  document.getElementById("thumb2").src = images[index].thumb2;

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function goToSlide(i) {
  index = i;
  updateSlide();
}

setInterval(() => {
  index = (index + 1) % images.length;
  updateSlide();
}, 5000);

createDots();
updateSlide();

function startCountdown() {
  const targetDate = new Date("2025-03-16T23:59:59").getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  updateTimer();
  const countdownInterval = setInterval(updateTimer, 1000);
}

startCountdown();

const wrapper = document.querySelector(".product-wrapper");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const cards = document.querySelectorAll(".product-card");

let currentCard = 0;

const cardWidth = cards[0].offsetWidth + 31;

function slideCards(direction) {
  const screenWidth = window.innerWidth;
  let visibleCards = 4;

  if (screenWidth <= 480) {
    visibleCards = 2;
  } else if (screenWidth <= 768) {
    visibleCards = 3;
  }

  const maxIndex = cards.length - visibleCards;

  if (direction === "next") {
    currentCard++;
    if (currentCard > maxIndex) {
      currentCard = 0;
    }
  } else if (direction === "prev") {
    currentCard--;
    if (currentCard < 0) {
      currentCard = maxIndex;
    }
  }
  wrapper.style.transform = `translateX(-${cardWidth * currentCard}px)`;
}

window.addEventListener("resize", () => {
  currentCard = 0;
  slideCards("next");
});

nextBtn.addEventListener("click", () => {
  slideCards("next");
});

prevBtn.addEventListener("click", () => {
  slideCards("prev");
});

let autoSlide = setInterval(() => {
  slideCards("next");
}, 3000);

wrapper.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

wrapper.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    slideCards("next");
  }, 3000);
});
