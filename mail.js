/*Initialize button(s)*/
bt1.onclick = mail;

//creates function to get form data
function mail() {
    var formData = {
        name: document.getElementById("tb1").value,
            companyName: document.getElementById("tb2").value,
            email: document.getElementById("tb3").value,
            projectDetails: document.getElementById("tb4").value
};

// Using fetch to send a POST request to server
fetch('/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network error');
    }
    return response.json();
})
.then(data => {
    alert('Email sent successfully');
    // Reset the form after successful submission
    document.getElementById("quoteForm").reset();
})
.catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    alert('Failed to send email');
});
}

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your_email@example.com',
      pass: 'your_password'
    }
  });

  // Setup email data with unicode symbols
  let mailOptions = {
    from: '"Your Name" <your_email@example.com>',
    to: 'admin@example.com', // Site administrator's email
    subject: 'New Message from Website',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
