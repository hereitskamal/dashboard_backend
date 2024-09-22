const express = require('express');
const User = require('../models/AuthUser');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password, registrationType, bloodGroup, employeeID, gender, contactNumber, firstName, middleName, lastName, companyId } = req.body;
  try {
    const user = new User({
      username,
      email,
      password,
      registrationType,
      bloodGroup,
      employeeID,
      gender,
      contactNumber,
      firstName,
      middleName,
      lastName,
      companyId // Include companyId
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const userDetail = {
      id: user._id,
      username: user.username,
      email: user.email,
      registrationType: user.registrationType == 'Super Admin' ? "K_%%110_%%545" : user.registrationType,
      bloodGroup: user.bloodGroup,
      employeeID: user.employeeID,
      gender: user.gender,
      contactNumber: user.contactNumber,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      companyId: user.companyId
    };
    res.status(200).json({ token, user: userDetail });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
