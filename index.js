const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const mail = { name: name, email: email, subject: subject, message: message };
  sendMail(mail);
});

const sendMail = (mail) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "https://nodemailer-vic-lo.herokuapp.com/send",
      data: mail,
    })
      .then((response) => {
        if (response.data.status === "success") {
          alert("Message Sent.");
          resolve(response.data);
        } else if (response.data.status === "fail") {
          alert("Message failed to send.");
        }
      })
      .catch((err) => {
        reject({
          stat: err.response.status,
          msg:
            "There was an error processing your request. Please, try again later.",
        });
      });
  });
};
