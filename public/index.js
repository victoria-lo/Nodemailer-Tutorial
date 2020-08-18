const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  mail.append("name", name);
  mail.append("email", email);
  mail.append("subject", subject);
  mail.append("message", message);

  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("https://nodemailer-vic-lo.herokuapp.com/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};
