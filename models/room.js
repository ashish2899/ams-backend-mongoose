const { Schema, default: mongoose } = require("mongoose");

const roomSchma = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  location_id: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

module.exports = mongoose.model("Room", roomSchma);
