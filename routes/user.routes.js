const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { jwtAuthMiddleware } = require('../jwt');

// ================= PROFILE =================
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// ================= CHANGE PASSWORD =================
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!(await user.comparePassword(currentPassword))) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: 'Password updated' });
});

module.exports = router;
