const { Schema, default: mongoose } = require("mongoose");

const locationSchema = new Schema({
  locationName: {
    type: String,
    required: true,
  },
  locationAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
