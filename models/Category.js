const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    unique: [true, "Name is already given"],
    required: [true, "Enter the food name"],
  },
  color: {
    type: String,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
