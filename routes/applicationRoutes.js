const express = require('express');
const jwt = require('jsonwebtoken');
const { createApplication, getApplicationsByUserId, getAllApplications, updateApplicationStatus } = require('../models/application');

const router = express.Router();

// Middleware to verify JWT and role
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// POST: Submit a new application (User only)
router.post('/submit-application', authenticate, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ error: 'Only users can submit applications' });
  }

  const { fullName, amount, tenure, employmentStatus, reason, employmentAddress } = req.body;

  if (!fullName || !amount || !tenure || !employmentStatus || !reason || !employmentAddress) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const application = await createApplication({
      userId: req.user.id,
      fullName,
      amount: parseFloat(amount),
      tenure: parseInt(tenure),
      employmentStatus,
      reason,
      employmentAddress,
    });
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// GET: Retrieve applications for the logged-in user (User) or all applications (Admin/Verifier)
router.get('/applications', authenticate, async (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'verifier') {
      const applications = await getAllApplications();
      res.json(applications);
    } else if (req.user.role === 'user') {
      const applications = await getApplicationsByUserId(req.user.id);
      res.json(applications);
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// PUT: Update application status (Verifier only)
router.put('/applications/:id', authenticate, async (req, res) => {
  if (req.user.role !== 'verifier') {
    return res.status(403).json({ error: 'Only verifiers can update application status' });
  }

  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const updatedApplication = await updateApplicationStatus(id, status);
    res.json({ message: 'Application status updated', application: updatedApplication });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

module.exports = router;