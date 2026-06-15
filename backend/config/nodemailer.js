const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  debug: true,
  logger: true
});

const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');
    console.log('   Email user:', process.env.EMAIL_USER);
    return true;
  } catch (error) {
    console.error('❌ SMTP connection verification FAILED:');
    console.error('   Error:', error.message);
    if (error.code === 'EAUTH') {
      console.error('   ⚠️  Authentication failed. Check EMAIL_USER and EMAIL_PASS in .env');
      console.error('   📌 For Gmail: Use App Password (not regular password)');
      console.error('   📌 Generate at: https://myaccount.google.com/apppasswords');
    }
    if (error.code === 'ESOCKET') {
      console.error('   ⚠️  Socket/connection error. Check network/port settings.');
    }
    return false;
  }
};

const sendContactEmail = async ({ name, email, subject, message }) => {
  console.log('📧 Preparing email...');
  console.log('   From:', process.env.EMAIL_USER);
  console.log('   To:', process.env.CONTACT_EMAIL);
  console.log('   Subject:', `Portfolio Contact: ${subject}`);

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%); padding: 3px; border-radius: 20px;">
        <div style="background: #ffffff; border-radius: 18px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a2e; margin: 0; font-size: 28px;">📬 New Message from Portfolio</h1>
            <div style="width: 60px; height: 4px; background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%); margin: 15px auto; border-radius: 2px;"></div>
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
            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; border-left: 4px solid #a855f7;">
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

  console.log('🚀 Sending email...');
  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Email sent! Message ID:', info.messageId);
  return info;
};

module.exports = { transporter, sendContactEmail, verifyTransporter };
