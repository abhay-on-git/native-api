const jwt = require("jsonwebtoken");

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "biuw8ey122xvshncd4dfbf4bf5v678434567890jkxjxbcdnfdc5641s53";

const generateToken = (userId , role) => {
  const token = jwt.sign({ userId , role }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    // console.log(decodedToken, "Decoded Token:"); // Check if this logs correctly
    return decodedToken.userId;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Error: Token expired");
      return error.message
    } else if (error.name === "JsonWebTokenError") {
      console.error("Error: JWT malformed");
      return error.message
    } else {
      console.error("Error verifying token:", error.message);
      return error.message
    }
  }
};

const getUserRoleFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.role;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Error: Token expired");
      return error.message
    } else if (error.name === "JsonWebTokenError") {
      console.error("Error: JWT malformed");
      return error.message
    } else {
      console.error("Error verifying token:", error.message);
      return error.message
    }
  }
};

module.exports = {
  generateToken,
  getUserIdFromToken,
  getUserRoleFromToken,
};
