const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByUsername } = require('../models/user');

const router = express.Router();

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
  res.json({ token, role: user.role });
});

module.exports = router;