const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/nodemailer');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const errors = {};
    if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Please enter a valid email';
    if (!subject || subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters';
    if (!message || message.trim().length < 10) errors.message = 'Message must be at least 10 characters';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const contact = new Contact({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() });
    await contact.save();

    try {
      await sendContactEmail({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() });
    } catch (emailError) {
      console.error('Email send failed:', emailError.message);
    }

    res.status(201).json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
