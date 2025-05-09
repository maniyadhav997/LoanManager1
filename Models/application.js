const db = require('../db');

const createApplication = (app) => {
  const stmt = db.prepare(`
    INSERT INTO applications (userId, fullName, amount, tenure, employmentStatus, reason, employmentAddress)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    app.userId,
    app.fullName,
    app.amount,
    app.tenure,
    app.employmentStatus,
    app.reason,
    app.employmentAddress
  );
  return { ...app, id: info.lastInsertRowid };
};

const getApplicationsByUserId = (userId) => {
  const stmt = db.prepare('SELECT * FROM applications WHERE userId = ?');
  return stmt.all(userId);
};

const getAllApplications = () => {
  const stmt = db.prepare('SELECT applications.*, users.username FROM applications JOIN users ON applications.userId = users.id');
  return stmt.all();
};

const updateApplicationStatus = (id, status) => {
  const stmt = db.prepare('UPDATE applications SET status = ? WHERE id = ?');
  stmt.run(status, id);
};

module.exports = { createApplication, getApplicationsByUserId, getAllApplications, updateApplicationStatus };