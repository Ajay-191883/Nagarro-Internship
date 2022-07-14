$(document).ready(function () {
  const username = $("#username");
  const email = $("#email");
  const emailError = $("#emailError");
  const usernameError = $("#usernameError");
  const regexp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  emailError.hide();
  usernameError.hide();

  let isEmailError = true;
  let isUsernameError = true;

  $(".clicks").on("click", function () {
    $("#box").toggleClass("show");
  });

  username.on("input", () => {
    checkUsernameValidity();
  });
  email.on("input", () => {
    checkEmailValidity();
  });

  $("#submit").on("click", function () {
    checkUsernameValidity();
    checkEmailValidity();
    if (!(isUsernameError || isEmailError)) {
      $("#box").removeClass("show");
      username.val("");
      email.val("");
    }
  });
  $("#closeModal").on("click", function () {
    $("#box").removeClass("show");
    username.val("");
    email.val("");
    isEmailError = true;
    isUsernameError = true;
    usernameError.hide();
    emailError.hide();
  });

  function checkUsernameValidity() {
    if (username.val().length < 3 || username.val().length > 10) {
      usernameError.show();
      isUsernameError = true;
    } else {
      usernameError.hide();
      isUsernameError = false;
    }
  }

  function checkEmailValidity() {
    console.log(email.val());
    if (!regexp.test(String(email.val()).toLowerCase())) {
      emailError.show();
      isEmailError = true;
    } else {
      emailError.hide();
      isEmailError = false;
    }
  }
});
