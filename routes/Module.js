const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

// Get all modules
router.get('/', async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
