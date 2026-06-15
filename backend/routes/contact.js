const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/nodemailer');

router.post('/', async (req, res) => {
  console.log('========================');
  console.log('📩 Contact Form Submission');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  console.log('========================');

  try {
    const { name, email, subject, message } = req.body;

    const errors = {};
    if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Please enter a valid email';
    if (!subject || subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters';
    if (!message || message.trim().length < 10) errors.message = 'Message must be at least 10 characters';

    if (Object.keys(errors).length > 0) {
      console.log('❌ Validation errors:', errors);
      return res.status(400).json({ success: false, errors });
    }

    console.log('📝 Saving to MongoDB...');
    const contact = new Contact({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });
    const saved = await contact.save();
    console.log('✅ Message saved to MongoDB (ID: ' + saved._id + ')');

    console.log('📧 Sending email notification...');
    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim()
      });
      console.log('✅ Email sent successfully to: ' + process.env.CONTACT_EMAIL);
    } catch (emailError) {
      console.error('❌ Email sending FAILED:');
      console.error('   Error name:', emailError.name);
      console.error('   Error message:', emailError.message);
      if (emailError.code) console.error('   Error code:', emailError.code);
      if (emailError.command) console.error('   Failed command:', emailError.command);
      if (emailError.response) console.error('   SMTP response:', emailError.response);
    }

    console.log('✅ Request completed successfully');
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.'
    });

  } catch (error) {
    console.error('=================================');
    console.error('❌ CONTACT FORM ERROR:');
    console.error('   Name:', error.name);
    console.error('   Message:', error.message);
    console.error('   Stack:', error.stack);
    console.error('=================================');

    if (error.name === 'ValidationError') {
      const fieldErrors = {};
      for (const field of Object.keys(error.errors)) {
        fieldErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({ success: false, errors: fieldErrors });
    }

    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate entry detected.' });
    }

    if (error.name === 'MongooseError' || error.name === 'MongoServerError') {
      return res.status(503).json({
        success: false,
        message: 'Database connection error. Please try again later.',
        debug: process.env.NODE_ENV !== 'production' ? error.message : undefined
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      debug: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
});

module.exports = router;
