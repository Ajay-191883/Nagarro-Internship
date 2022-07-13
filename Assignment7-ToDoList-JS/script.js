const inputEl = document.querySelector("#input");
const ulList = document.querySelector("ul");
console.log(ulList.querySelector(".fa-trash"));
inputEl.addEventListener("change", () => {
  console.log(inputEl.value);
  var input = inputEl.value;
  ulList.insertAdjacentHTML(
    "beforeend",
    "<li>" +
      input +
      '<i class="fa fa-check" aria-hidden="true"></i> <i class="fas fa-trash "></i> </li>'
  );
  ulList.querySelector("p").style.display = "none";
  inputEl.value = "";

  ulList.querySelectorAll(".fa-trash")?.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.closest("li").style.display = "none";
    });
  });

  ulList.querySelectorAll(".fa-check")?.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.closest("li").style.textDecoration = "line-through";
      elm.style.display = "none";
    });
  });
});
