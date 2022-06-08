const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: [true, "Enter the user name"],
  },
  email: {
    type: String,
    required: [true, "Enter the email"],
    unique: true,
  },
  phone: {
    type: Number,
    minimum: 0,
  },
  password: {
    type: String,
    required: [true, "Enter the password"],
  },
  address: {
    type: Object,
  },
  role_id: {
    type: { type: Number, enum: [1, 2] },
  },
  created_date: {
    type: Date,
  },
  last_activity: {
    type: Date,
  },
});

module.exports = mongoose.model("Users", UserSchema);
