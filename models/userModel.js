const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter a username."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email address."],
      unique: [true, "Email address already exists."],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: "Please enter a valid email address.",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter a password."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
// export default mongoose.model("User", userSchema);
