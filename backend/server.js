// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/students'); // Path to your student routes

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Use the student routes
app.use('/api', studentRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
