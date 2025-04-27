const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();


const signup = async (req , res ) => {
  const { email, password} = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const accountExist = await prisma.users.findFirst({
      where: { email },
    });
    if (accountExist) {
      return res.status(409).json({
        success: false,
        message: "Account already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const accountCreated = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    });


    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        usersId: accountCreated.id,
        email: accountCreated.email,
      },
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error", 
      error: error.message,
    });
  }
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    const accountExist = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!accountExist) {
      return res.status(404).json({
        success: false,
        message: "Account does not exist",
      });
    }
    const samePassword = await bcrypt.compare(password, accountExist.password);
    if (!samePassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const accessToken = jwt.sign(
      {
        id: accountExist.id,
        email: accountExist.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: accessToken,
        email: accountExist.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error", 
      error: error.message,
    });
  }
};

module.exports = { signup, login };
