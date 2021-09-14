import nodemailer from 'nodemailer'

const email: string = process.env.GMAIL_EMAIL
const password: string = process.env.GMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: email,
    password,
  },
})

export const SendForgotPasswordMail = (sendingEmail: string, hash: string) => {
  var mainOptions = {
    from: email,
    to: sendingEmail,
    subject: 'Here is your link',
    html: `
              <h1>Greetings from Mess App!</h1>
          <p>Your password changing link is <a href="http://localhost:3000/forgot-password/${hash}">Here</a></p>
          <p style="font-weight:bold;">Stay safe. Stay healthy</p>
          <p>Team Mess App</p>
              `,
  }

  transporter.sendMail(mainOptions, async (err, info) => {
    if (err) {
      console.log(err)
      throw new Error('FUCk')
    } else {
      console.log('Mail sent to ' + email)
    }
  })
}

export const SendWelcomeMail = (sendingEmail: string, hash: string) => {
  var mainOptions = {
    from: email,
    to: sendingEmail,
    subject: 'You are now Signed up!',
    html: `
          <h1>Greetings from Mess App!</h1>
      <p>You have now successfully signed up to our portal.</p>
      <p>Your verification link is <a href="http://localhost:8080/api/student/verify-email/${hash}">Here</a></p>
      <p style="font-weight:bold;">Stay safe. Stay healthy</p>
      <p>Team Mess App</p>
          `,
  }

  transporter.sendMail(mainOptions, async (err, info) => {
    if (err) {
      console.log(err)
      throw new Error('FUCk')
    } else {
      console.log('Mail sent to ' + email)
    }
  })
}
