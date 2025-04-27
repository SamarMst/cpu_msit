

const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getUserInformation = async (req, res) => {
  try {
    // Assuming your authenticateToken middleware adds the user's email to req.user
    const userEmail = req.user.email;

    const user = await prisma.users.findUnique({ // Corrected model name to 'Users'
      where: { email: userEmail },
      select: { // Select the fields you want to return
        id: true,
        email: true,
        createdAt: true,
        // Add other fields you want to include
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });

  } catch (error) {
    console.error("Error getting user information:", error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

module.exports = getUserInformation;

