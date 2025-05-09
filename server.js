const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', applicationRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Seed initial users (only if the database is empty)
const seedUsers = async () => {
  const { User } = require('./models/user'); // Import User here to ensure it's defined
  const bcrypt = require('bcryptjs');

  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const users = [
      { username: 'user1', password: 'password123', role: 'user' },
      { username: 'admin1', password: 'admin123', role: 'admin' },
      { username: 'verifier1', password: 'verifier123', role: 'verifier' },
    ];

    for (const user of users) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      await User.create({
        username: user.username,
        password: hashedPassword,
        role: user.role,
      });
    }
    console.log('Users seeded successfully');
  }
};

mongoose.connection.once('open', () => {
  seedUsers(); // Run seeding after the connection is established
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});