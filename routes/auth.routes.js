const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { generateToken } = require('../jwt');

// ================= SIGNUP =================
router.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body);

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed' });
  }
});

// ================= LOGIN =================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
