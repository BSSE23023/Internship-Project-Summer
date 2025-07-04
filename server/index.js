import dotenv from 'dotenv';
dotenv.config(); // MUST BE FIRST

import express from 'express';
import cors from 'cors';
import connectDB from './database/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    time: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Central error handling
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ 
    message: "Internal Server Error",
    error: err.message 
  });
});

// Database connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ Database connection failed', error);
    process.exit(1);
  });