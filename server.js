const express = require('express');
const cors = require('cors'); // Import cors
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from specific origins
const allowedOrigins = [
  'http://localhost:3000', // Allow local frontend during development
  'https://loan-manager-frontend.vercel.app', // Replace with your deployed frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  })
);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});