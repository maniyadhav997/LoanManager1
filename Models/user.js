const db = require('../db');
const bcrypt = require('bcryptjs');

const findUserByUsername = (username) => {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username);
};

const createUser = (username, password, role) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
  const info = stmt.run(username, hashedPassword, role);
  return { id: info.lastInsertRowid, username, role };
};

module.exports = { findUserByUsername, createUser };