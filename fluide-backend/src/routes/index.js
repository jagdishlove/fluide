const express = require("express");
const config = require("../config/config");

const router = express.Router();
const userRoute = require("./user.route");

router.use("/", userRoute);
router.use("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
module.exports = router;
