const nodemailer = require('nodemailer')

const destination = {
  send: async ({ to, subject, message }) => {
    try {
      const testAccount = await nodemailer.createTestAccount()
      const host = process.env.ALERTER_EMAIL_HOST || 'smtp.ethereal.email'
      const port = process.env.ALERTER_EMAIL_PORT || 587
      const user = process.env.ALERTER_EMAIL_USER || testAccount.user
      const pass = process.env.ALERTER_EMAIL_PW || testAccount.pass

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth: {
          user,
          pass
        }
      })

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `"Converge Lite Threshold Alerts" <${user}>`, // sender address
        to,
        subject,
        text: message,
        html: message
      })

      return { success: !!info.messageId }
    } catch (e) {
      console.error('Could not send email :: ', e)
      return { success: false }
    }
  }
}

module.exports = {
  destination
}
