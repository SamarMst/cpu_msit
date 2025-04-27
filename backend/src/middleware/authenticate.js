const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    
    if (!authorization) {
      return res.status(401).json({ 
        success: false, 
        message: "Authorization header is missing" 
      });
    }
    
    const authHeader = authorization.split(" ");
    
    if (authHeader[0] !== "Bearer") {
      return res.status(401).json({ 
        success: false, 
        message: "Authorization header must start with Bearer" 
      });
    }
    
    if (!authHeader[1]) {
      return res.status(401).json({ 
        success: false, 
        message: "Token is missing" 
      });
    }
    
    const { ACCESS_TOKEN_SECRET } = process.env;
    const decoded = await jwt.verify(authHeader[1], ACCESS_TOKEN_SECRET);
    
    req.user = { 
      id: decoded.id, 
      email: decoded.email 
    };
    
    next();
    
  } catch (error) {
    console.error("Authentication error:", error);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        success: false, 
        message: "Token has expired" 
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        success: false, 
        message: "Token is invalid" 
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: "User is not authenticated",
        error: error.message 
      });
    }
  }
};

module.exports = authenticateToken;