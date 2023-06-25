const mongoose = require("mongoose");
const connectDB = async() => {
  // データベースとの接続処理を書く
  try {
    await mongoose.connect(
      "mongodb+srv://wa1204chan:HQNeko1204@cluster0.sgljzti.mongodb.net/appDataBase?retryWrites=true&w=majority"
    );
    console.log("Success: Connected to MongoDB");
  } catch (err) {
    console.log("Error: Failed to connect to MongoDB");
    throw new Error();
  }
};
module.exports = connectDB;
