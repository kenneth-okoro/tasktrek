const mongoose = require('mongoose');
const { DB_URI, NODE_ENV } = require('../config/env');

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.<development/production>"
  );
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
    } catch (error) {
        console.log("Error connecting to the database", error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;