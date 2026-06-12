const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendContactEmail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3px; border-radius: 20px;">
        <div style="background: #ffffff; border-radius: 18px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a2e; margin: 0; font-size: 28px;">New Message from Portfolio</h1>
            <div style="width: 60px; height: 4px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 15px auto; border-radius: 2px;"></div>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 20px; background: #f8f9fa; font-weight: 600; color: #333; width: 100px; border-radius: 8px 0 0 8px;">Name</td>
              <td style="padding: 12px 20px; background: #f8f9fa; color: #555; border-radius: 0 8px 8px 0;">${name}</td>
            </tr>
            <tr><td colspan="2" style="height: 10px;"></td></tr>
            <tr>
              <td style="padding: 12px 20px; background: #f8f9fa; font-weight: 600; color: #333; width: 100px; border-radius: 8px 0 0 8px;">Email</td>
              <td style="padding: 12px 20px; background: #f8f9fa; color: #555; border-radius: 0 8px 8px 0;">${email}</td>
            </tr>
            <tr><td colspan="2" style="height: 10px;"></td></tr>
            <tr>
              <td style="padding: 12px 20px; background: #f8f9fa; font-weight: 600; color: #333; width: 100px; border-radius: 8px 0 0 8px;">Subject</td>
              <td style="padding: 12px 20px; background: #f8f9fa; color: #555; border-radius: 0 8px 8px 0;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 25px;">
            <h3 style="color: #1a1a2e; margin-bottom: 10px;">Message:</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border-left: 4px solid #667eea;">
              <p style="color: #555; line-height: 1.6; margin: 0;">${message}</p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 13px;">This message was sent from your portfolio website contact form.</p>
          </div>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { transporter, sendContactEmail };
