const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("https://nodemailer-vic-lo.herokuapp.com/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    if (response.data.status === "success") {
      alert("Message Sent.");
      resolve(response.data);
    } else if (response.data.status === "fail") {
      alert("Message failed to send.");
    }
  });
};
