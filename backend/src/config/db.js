const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTIONSTRING);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;