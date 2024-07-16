const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

connectDB();
app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));
  

app.use('/api/auth',authRoutes);
app.use('/posts',postsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=>console.log('server running'));