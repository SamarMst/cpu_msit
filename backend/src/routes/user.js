const express = require("express");
const router = express.Router();

const getUserInformation = require("../controller/user"); // Import directly



router.get("/userInfo", getUserInformation);

module.exports = router;