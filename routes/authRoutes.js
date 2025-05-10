const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByUsername } = require('../Models/user');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role, username: user.username });
});

// Get logged-in user details
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await require('../Models/user').User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ username: user.username, role: user.role });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;