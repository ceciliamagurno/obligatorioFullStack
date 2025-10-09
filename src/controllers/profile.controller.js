const { findUserById, updateUserPlan } = require('../models/repositories/user.repository');

const changePlanController = (req, res) => {
    const userId = req.user.id;
    const user = findUserById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (user.plan !== 'plus') {
        return res.status(400).json({ message: 'Solo los usuarios en plan plus pueden cambiar a premium' });
    }

    const updated = updateUserPlan(userId, 'premium');
    res.status(200).json({ message: 'Plan actualizado a premium', user: updated });
};

module.exports = { changePlanController };
