const Database = require('better-sqlite3');

const db = new Database('loan_manager.db', { verbose: console.log });

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('user', 'admin', 'verifier'))
  )
`);

// Create applications table
db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    fullName TEXT NOT NULL,
    amount REAL NOT NULL,
    tenure INTEGER NOT NULL,
    employmentStatus TEXT NOT NULL,
    reason TEXT NOT NULL,
    employmentAddress TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  )
`);

// Seed initial users (for testing)
const users = [
  { username: 'user1', password: 'password123', role: 'user' },
  { username: 'admin1', password: 'admin123', role: 'admin' },
  { username: 'verifier1', password: 'verifier123', role: 'verifier' },
];

const bcrypt = require('bcryptjs');

// Check if a user exists before inserting
const checkUserStmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE username = ?');
const insertStmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');

users.forEach(user => {
  const exists = checkUserStmt.get(user.username).count > 0;
  if (!exists) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    insertStmt.run(user.username, hashedPassword, user.role);
    console.log(`Inserted user: ${user.username}`);
  } else {
    console.log(`User ${user.username} already exists, skipping insertion.`);
  }
});

module.exports = db;