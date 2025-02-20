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
