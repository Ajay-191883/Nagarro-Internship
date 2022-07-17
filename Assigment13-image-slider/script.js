const leftBtn = document.querySelector(".left-arrow");
const rightBtn = document.querySelector(".right-arrow");
const imageContainer = document.querySelector(".images");
const images = document.querySelectorAll(".images img");
const imageWidth = window
  .getComputedStyle(document.querySelector(".sliding-container"))
  .width.split("px")[0];
let index = 0;

leftBtn.addEventListener("click", () => {
  slideImage("prev");
});
rightBtn.addEventListener("click", () => {
  slideImage("next");
});

function slideImage(direction) {
  if (direction == "next") {
    if (index <= -1) {
      index = 1;
    } else {
      index--;
    }
    imageContainer.style.transform = `translate(${index * +imageWidth}px)`;
  } else {
    if (index >= 1) {
      index = -1;
    } else {
      index++;
    }
    console.log(`${index}`);
    imageContainer.style.transform = `translate(${index * +imageWidth}px)`;
  }
}
