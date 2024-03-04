
//establishes document form and extracts data from form
const form = document.querySelector('get-quote');
var name = formData.get("name");
var company_name = formData.get("company_name");
var email = formData.get("email");
var project_details = formData.get("project_details");

function sendEmail() {
Email.send({
  Gmail_SMTP_server_address: "smtp.gmail.com",
  Gmail_SMTP_name: "Darryl Williams",
  Gmail_SMTP_username: "darrylwilliams6@gmail.com",
  Gmail_SMTP_password: "Sh4d0wH4x0r!",
  To: "darrylwilliams6@gmail.com",
  From: email,
  Subject : "Potential Projects",
  Body : project_details
}).then(
message => alert(message)
);
}
//creates functionallity to submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
});