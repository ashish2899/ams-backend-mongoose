const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email address."],
      unique: [true, "Email address already exists."],
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
