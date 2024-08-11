const mongoose = require("mongoose");

// connecting to mongo database
const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`error: ${error}`);
  }
};

module.exports = connectToDataBase;
