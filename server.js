require("dotenv").config();
const connectDB = require("./db/connectDB");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

// routers
const assetRoutes = require("./api/routes/assetRoutes");
const usersRoutes = require("./api/routes/usersRoutes");

// middleware
const errorHandler = require("./middleware/errorHandler");

connectDB();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use("/api/v1/asset", assetRoutes);
app.use("/api/v1/user", usersRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("hello world...!!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
