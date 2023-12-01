require("dotenv").config();
const connectDB = require("./db/connectDB");

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

// routers
const assetRoutes = require("./api/routes/assetRoutes");
const usersRoutes = require("./api/routes/usersRoutes");

// middleware
const errorHandler = require("./middleware/errorHandler");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use("/api/v1/asset", assetRoutes);
app.use("/api/v1/users", usersRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("hello world...!!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
