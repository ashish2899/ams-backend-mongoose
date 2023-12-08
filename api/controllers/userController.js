const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

// @desc Register a user
// @route POST /api/v1/users/register
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Email alerady exits
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  // Create user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  console.log(`User Created ${user}`);
  if (user) {
    res.status(201).json({
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login a user
// @route POST /api/v1/users/login
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user._id);
      }
    );
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc Get current user
// @route GET /api/v1/users/current
// @access Private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  res.json(req.user);
});

// @desc Logout a user
// @route GET /api/v1/user/logout
// @access Private
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.json({ success: true, message: "User logged out successfully" });
  res.clearCookie("token");
});
