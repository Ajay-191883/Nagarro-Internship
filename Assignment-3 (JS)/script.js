document.getElementById("seeBtn").addEventListener("click", function () {
  let isTrue = window.confirm("Are you sure, you want to see them...");
  if (isTrue) {
    window.location.href = "./index2.html";
  }
});
