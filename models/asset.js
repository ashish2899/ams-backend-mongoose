const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assetSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // location:{
    //     type: String,
    //     required: true
    //     // enum: ["Hall 1", "Hall 2", "Hall 3", "Hall 4", "Hall 5"]
    // }
    // category: {
    //   type: String,
    //   required: true,
    //   enum:[]
    // },
    status: {
      type: String,
      required: true,
      enum: [
        "Available",
        "Assigned to Employee",
        "Out of Repaire",
        "Disposed",
        "Damaged",
      ],
      default: "Available",
    },
    purchase_cost: {
      type: Number,
      required: true,
    },
    purchase_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Asset", assetSchema);
