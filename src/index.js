const { app } = require('./app');
const { server } = require('./server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config();

// Connect to DB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to DB'.bgGreen.white);
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

connectToDatabase();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});
