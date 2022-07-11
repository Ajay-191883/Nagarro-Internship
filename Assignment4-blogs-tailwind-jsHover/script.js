document.querySelectorAll(".blog").forEach((blog) => {
  blog.style.transition = "all .2s ease-in-out";
  blog.addEventListener("mouseenter", () => {
    blog.style.backgroundColor = "white";
    blog.style.transform = "scale(1.1)";
  });
  blog.addEventListener("mouseleave", () => {
    blog.style.backgroundColor = "unset";
    blog.style.transform = "scale(1)";
  });
});
