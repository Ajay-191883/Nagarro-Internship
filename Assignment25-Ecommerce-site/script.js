const totalSlides = document.querySelectorAll(".carousel-item");
const goLeft = document.querySelector("#left");
const goRight = document.querySelector("#right");
let currSlide = 0;

goLeft.addEventListener("click", () => {
  getSlide(currSlide - 1);
  clearInterval(slidingTime);
});

goRight.addEventListener("click", () => {
  getSlide(currSlide + 1);
  clearInterval(slidingTime);
});

function getSlide(slideNo) {
  slideNo = slideNo < 0 ? totalSlides.length - 1 : slideNo;
  slideNo = slideNo >= totalSlides.length ? 0 : slideNo;
  totalSlides[currSlide].classList.remove("active");
  totalSlides[slideNo].classList.add("active");
  currSlide = slideNo;
}
const slidingTime = setInterval(() => {
  getSlide(currSlide + 1);
}, 3000);
