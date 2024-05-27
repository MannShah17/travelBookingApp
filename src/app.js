const express = require('express');
const cors = require('cors');
const tripRoutes = require('../routes/tripRoutes');
const authRoutes = require('../routes/authRoutes');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/trips', tripRoutes);
app.use('/api/auth', authRoutes);

module.exports = { app };
