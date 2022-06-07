const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category");

const FoodSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: [true, "Enter the food name"],
  },
  price: {
    type: Number,
    minimum: 0,
  },
  portion: {
    type: Number,
    minimum: 0,
  },
  image: {
    type: String,
  },
  tumb_img: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  sales: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
  },
  discount: {
    type: Number,
    minimum: 0,
    default: 0,
  },
  category: {
    type: mongoose.SchemaTypes.Mixed,
    ref: "Category",
  },
});

module.exports = mongoose.model("Foods", FoodSchema);
