const sendBtn = document.getElementById("sendEmailBtn");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const form = document.getElementById("form");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(emailInput.value) && phoneInput.value) {
    Email.send({
      SecureToken: "a9f401bc-da2b-479f-9228-096d858c8a16",
      To: "bittusuper11@gmail.com",
      From: "bittusuper11@gmail.com",
      Subject: "Thankyou for your Feedback",
      Body: "Hello there, we have received your feedback, and we promise we will get back to you as soon as possible, Thanks again for contacting us :) ",
    }).then((message) => {
      if (message == "OK") {
        emailInput.value = "";
        phoneInput.value = "";
        alert(
          "Thankyou for contacting us, You will recieve a acknowledgement Mail regarding this feedback :)"
        );
      } else {
        alert(
          "Oh! Snap, There is some error in sending your feedback, Please try after some time ;)"
        );
        console.log(message);
      }
    });
  } else {
    alert("Please Enter Valid Email Address and Phone Number");
  }
});
