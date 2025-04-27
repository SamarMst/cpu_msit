const express = require("express");
const router = express.Router();

const { getUserInformation, forgotPassword, resetPassword } = require("../controller/user"); 
const authenticateToken = require("../middleware/authenticate");
router.get("/userInfo", authenticateToken, getUserInformation);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
