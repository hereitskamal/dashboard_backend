const express = require('express');
require('dotenv').config();
const router = express.Router();
const nodemailer = require('nodemailer');
const Company = require('../models/registeredCompanies'); // Ensure this matches the filename of the updated schema
const Module = require('../models/Module');

// Create a new company and send email to the admin
router.post('/', async (req, res) => {
  const { name, uuid, modules, admin, adminEmail, startDate, employeeRange, address, contactNumber } = req.body;

  try {
    if (modules && !Array.isArray(modules)) {
      return res.status(400).json({ error: 'Modules must be an array of ObjectIds' });
    }

    // Create a new company
    const company = new Company({ 
      name, 
      uuid, 
      modules, 
      admin, 
      adminEmail, 
      startDate, 
      employeeRange, 
      address, 
      contactNumber 
    });

    const savedCompany = await company.save();
    const populatedCompany = await Company.findById(savedCompany._id).populate('modules');

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'kamalsharma9827@gmail.com',
        pass: 'swbk hcfh tucp gpfs',
      },
    });

    const mailOptions = {
      from: '"Your Company Name" <your-email@gmail.com>',
      to: adminEmail,
      subject: `Welcome to ${name}`,
      text: `Hello ${admin},\n\nCongratulations! Your company "${name}" has been successfully created.\n\nPlease register using the following link:\n${process.env.REACT_APP_API_URL}/register/${uuid}\n\nBest regards,\nYour Company Team`, 
      html: `<p>Hello <strong>${admin}</strong>,</p>
             <p>Congratulations! Your company "<strong>${name}</strong>" has been successfully created.</p>
             <p>Please register using the following link:</p>
             <a href="${process.env.REACT_APP_API_URL}/signup/${populatedCompany._id}">${process.env.REACT_APP_API_URL}/signup/${populatedCompany._id}</a>
             <p>Best regards,<br>Your Company Team</p>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Company created but failed to send email' });
      }
      console.log('Email sent: %s', info.response);
    });

    // Send success response
    res.status(201).json(populatedCompany);
  } catch (err) {
    console.error('Failed to create company:', err);
    res.status(500).json({ error: 'Failed to create company' });
  }
});

// Get all companies with populated modules
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find().populate('modules');
    res.json(companies);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
