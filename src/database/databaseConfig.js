const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conected to MONGO DATABASE successfully!");
  } catch (err) {
    throw new Error("Error connecting to MONGO DATABASE.");
  }
};

module.exports = { connectDB };
