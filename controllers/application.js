const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
})

async function uploadResume(req, res) {
  try {
    const { filename, path } = req.file
    res.json({ filename, path })
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function sendMail(req, res) {
  try {
    await transporter.sendMail({
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL,
      subject: "New Application",
      html: `
      <h3>Name : ${req.body.firstName} ${req.body.lastName}</h3>
      <h4>Email : ${req.body.email}</h4>
      <h4>Mobile : ${req.body.mobile}</h4>
      <h5>Current CTC : ${req.body.current_CTC}</h5>
      <h5>Expected CTC : ${req.body.expected_CTC}</h5>
      <h5>Notice period : ${req.body.noticePeriod}</h5>
      <h6>Cover letter : ${req.body.coverLetter} </h6>
      `,
      attachments: [req.body.file]
    })

    await transporter.sendMail({
      to: req.body.email,
      from: process.env.EMAIL,
      subject: "New Application",
      html: `
      <p>Greetings from Coinskite, Thank you for applying. We will contact you soon.</p>
      `
    })

    res.json({ msg: "Applied successfully" })

  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

module.exports = {
  sendMail,
  uploadResume
}