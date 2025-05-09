const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'verifier'], required: true },
});

const User = mongoose.model('User', userSchema);

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const createUser = async (username, password, role) => {
  const hashedPassword = require('bcryptjs').hashSync(password, 10);
  return await User.create({ username, password: hashedPassword, role });
};

module.exports = { User, findUserByUsername, createUser };