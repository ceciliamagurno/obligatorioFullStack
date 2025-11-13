require("dotenv").config();
const jwt = require("jsonwebtoken");

const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
  }

  try {
    const verified = jwt.verify(token, AUTH_SECRET_KEY);
    req.user = verified; // incluye id, username y plan
    next();
  } catch (error) {
    console.error("Error verificando token:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
  }
};

const requirePlan = (requiredPlan) => (req, res, next) => {
  if (req.user.plan !== requiredPlan) {
    return res.status(403).json({ message: "Forbidden - Insufficient plan" });
  }
  next();
};

module.exports = {
  authMiddleware,
  requirePlan,
};
