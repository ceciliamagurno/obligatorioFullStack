const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
    }
    try {
        const verified = jwt.verify(token, AUTH_SECRET_KEY);
        req.user = verified;  // Ahora incluye 'plan'
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
    }
}

// Ejemplo de middleware adicional para verificar plan (opcional)
const requirePlan = (requiredPlan) => (req, res, next) => {
    if (req.user.plan !== requiredPlan) {
        return res.status(403).json({ message: "Forbidden - Insufficient plan" });
    }
    next();
};

module.exports = {
    authMiddleware,
    requirePlan  // Exporta si lo usas
};