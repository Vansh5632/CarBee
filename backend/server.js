const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend application's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204,
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
