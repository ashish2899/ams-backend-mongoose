const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/userController");
const asyncHandler = require("express-async-handler");
const validateToken = require("../../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get(
  "/current",
  validateToken,
  asyncHandler(async (req, res) => {
    res.json(req.user);
  })
);
router.get("/logout", logoutUser);

module.exports = router;
