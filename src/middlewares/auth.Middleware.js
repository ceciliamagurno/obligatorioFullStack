const jwt = require('jsonwebtoken');
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;


const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
    }
    try {
        const verified = jwt.verify(token, AUTH_SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
    }
}


module.exports = {
    authMiddleware
}