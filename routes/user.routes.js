const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

/* ===================== AUTH ===================== */

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/* ================== USER ROUTES ================= */

// PROFILE
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

// CHANGE PASSWORD
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: 'Password updated' });
});

module.exports = router;
