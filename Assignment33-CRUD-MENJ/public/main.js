const addNewBtn = document.getElementById("addNewBtn");
addNewBtn.style.display = "none";
const nameElm = document.getElementById("nameInp");
const quoteElm = document.getElementById("quoteInp");
const submitBtn = document.getElementById("submitBtn");
let editMode = false;
let editQuoteId = "";
let delQuoteId = "";

document.querySelectorAll(".editBtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const quoteRow = this.closest(".row");
    const quoteAuth = quoteRow.querySelector(".quote-auth");
    const quoteDesc = quoteRow.querySelector(".quote-desc");
    editQuoteId = quoteRow.getAttribute("data-id");
    console.log(quoteAuth, quoteAuth.innerText);
    nameElm.value = quoteAuth.innerText;
    quoteElm.value = quoteDesc.innerText;
    editMode = true;
    submitBtn.innerText = "Update";
    addNewBtn.style.display = "";
  });
});
document.querySelectorAll(".delBtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const quoteRow = this.closest(".row");
    delQuoteId = quoteRow.getAttribute("data-id");
    deleteQuote(delQuoteId);
  });
});

addNewBtn.addEventListener("click", function () {
  submitBtn.innerText = "Create";
  addNewBtn.style.display = "none";
  editMode = false;
  nameElm.value = "";
  quoteElm.value = "";
});

submitBtn.addEventListener("click", function () {
  if (editMode) {
    updateQuote(editQuoteId);
  } else {
    newQuote();
  }
});

function updateQuote(id) {
  fetch("/updateQuote", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      name: nameElm.value,
      quote: quoteElm.value,
    }),
  }).then((res) => {
    window.location.reload(true);
  });
}
function newQuote() {
  fetch("/newQuote", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameElm.value,
      quote: quoteElm.value,
    }),
  }).then((res) => {
    window.location.reload(true);
  });
}

function deleteQuote(id) {
  fetch("/deleteQuote", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
    }),
  }).then((res) => {
    window.location.reload(true);
  });
}
