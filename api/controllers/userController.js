const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
exports.registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
exports.loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          fullname: user.fullname,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1d" }
    );
    res.cookie("token", accessToken);
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
exports.currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @desc Logout a user
// @route GET /api/v1/user/logout
// @access Private
exports.logoutUser = asyncHandler(async (req, res, next) => {
  // logout fuctinallity after delete access_token
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout successfully",
    access_token: null,
  });
});
