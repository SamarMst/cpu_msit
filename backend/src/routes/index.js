const router = require("express").Router();
const authenticateToken = require("../middleware/authenticate");

const authRouter = require("./auth");
const userInfoRouter = require("./user");


router.use("/auth", authRouter);
router.use("/user", authenticateToken, userInfoRouter);

module.exports = router;
