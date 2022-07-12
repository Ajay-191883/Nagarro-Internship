$(document).ready(function () {
  $("#userNameValidation").hide();
  $("#passwordValidation").hide();
  $("#emailValidation").hide();
  $("#confirmPasswordValidation").hide();

  var Error = true;
  var password_error = true;
  var confirm_password_error = true;

  $("#username").keyup(function () {
    username_validation();
  });

  function username_validation() {
    var username_val = $("#username").val();
    if (username_val.length == "") {
      $("#userNameValidation").show();
      $("#userNameValidation").html("Username cannot be Empty");
      $("#userNameValidation").css("color", "red");
      Error = false;
      return Error;
    } else {
      $("#userNameValidation").hide();
    }

    if (username_val.length < 3 || username_val.length > 10) {
      $("#userNameValidation").show();
      $("#userNameValidation").html("Invalid Username");
      $("#userNameValidation").css("color", "red");
      Error = false;
      return Error;
    } else {
      $("#userNameValidation").hide();
    }
  }

  $("#email").keyup(function () {
    email_validation();
  });

  function email_validation() {
    var email_val = $("#email").val();
    var emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(email_val)) {
      $("#emailValidation").hide();
    } else {
      $("#emailValidation").show();
      $("#emailValidation").html("Invalid email");
      $("#emailValidation").css("color", "red");
      email_error = false;
      return Error;
    }
  }

  $("#password").keyup(function () {
    password_validation();
  });

  function password_validation() {
    var password_val = $("#password").val();
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (strongRegex.test(password_val)) {
      $("#passwordValidation").hide();
    } else {
      $("#passwordValidation").show();
      $("#passwordValidation").html("Invalid Password");
      $("#passwordValidation").css("color", "red");
      password_error = false;
      return Error;
    }
  }

  $("#confirmPassword").keyup(function () {
    confirm_password();
  });

  function confirm_password() {
    var confirm_password_val = $("#confirmPassword").val();
    var password_val = $("#password").val();
    if (confirm_password_val != password_val) {
      $("#confirmPasswordValidation").show();
      $("#confirmPasswordValidation").html("Password did not matched");
      $("#confirmPasswordValidation").css("color", "red");
      confirm_password_error = false;
      return confirm_password_error;
    } else {
      $("#confirmPasswordValidation").hide();
    }
  }

  $("#submitValidation").click(function () {
    username_validation();
    password_validation();
    confirm_password();

    if (Error || password_error || confirm_password_error) {
      return false;
    }
  });
});
