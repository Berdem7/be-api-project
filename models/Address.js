const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  district: {
    type: String,
  },
  khoroo: {
    type: String,
  },
  apartment: {
    type: String,
  },
  additional: {
    type: String,
  },
  address_type: {
    type: String,
    enum: ["main", "sub"],
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("address", AddressSchema);
