const express = require('express');
require('dotenv').config(); // Load .env variables
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});