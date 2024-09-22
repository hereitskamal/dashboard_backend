// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const CompanyUser = require('../models/CompanyUser'); // Ensure you use the correct model

// Get all users for a company
router.get('/:companyId/users', async (req, res) => {
  const { companyId } = req.params;
  if (!companyId) {
    return res.status(400).json({ message: 'companyId is required' });
  }
  try {
    const users = await CompanyUser.find({ companyId });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

router.post('/:companyId/users', async (req, res) => {
    const { companyUser, email, mobileNumber, dob, address } = req.body;
    const { companyId } = req.params;
  
    if (!companyId) {
      return res.status(400).json({ message: 'companyId is required' });
    }
    if (!mobileNumber) {
      return res.status(400).json({ message: 'mobileNumber is required' });
    }
  
    try {
      const newUser = new CompanyUser({ companyUser, email, mobileNumber, dob, address, companyId });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ message: 'Failed to add user', error: error.message });
    }
  });

module.exports = router;
