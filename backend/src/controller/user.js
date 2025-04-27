const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { ACCESS_TOKEN_SECRET, EMAIL_USER, EMAIL_PASS } = process.env;

// --------------------- GET USER INFORMATION ---------------------

const getUserInformation = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const user = await prisma.users.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        countryCode: true,
        phoneNumber: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const formattedUser = {
      ...user,
      fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null,
      formattedPhoneNumber: user.phoneNumber && user.countryCode ? 
        `${user.countryCode} ${user.phoneNumber}` : null,
    };

    return res.status(200).json({ success: true, data: formattedUser });

  } catch (error) {
    console.error("Error getting user information:", error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// --------------------- FORGOT PASSWORD ---------------------

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const token = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Link',
      html: `
        <p>You requested to reset your password.</p>
         <p>Click <a href="https://cpu-msit-samar-mestiris-projects.vercel.app/reset-password/${token}">here</a> to reset it.</p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: 'Password reset link sent to your email' });

  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

// --------------------- RESET PASSWORD ---------------------

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return res.json({ success: true, message: 'Password successfully reset' });

  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ success: false, message: 'Invalid or expired token', error: error.message });
  }
};

module.exports = {
  getUserInformation,
  forgotPassword,
  resetPassword,
};
