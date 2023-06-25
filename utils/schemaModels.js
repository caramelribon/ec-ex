const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
});

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

exports.ItemModel = mongoose.model("Item", ItemSchema);
exports.UserModel = mongoose.model("User", UserSchema);
