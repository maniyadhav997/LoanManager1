const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  amount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  employmentStatus: { type: String, required: true },
  reason: { type: String, required: true },
  employmentAddress: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);

const createApplication = async (app) => {
  return await Application.create(app);
};

const getApplicationsByUserId = async (userId) => {
  return await Application.find({ userId }).populate('userId', 'username');
};

const getAllApplications = async () => {
  return await Application.find().populate('userId', 'username');
};

const updateApplicationStatus = async (id, status) => {
  return await Application.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = { createApplication, getApplicationsByUserId, getAllApplications, updateApplicationStatus };