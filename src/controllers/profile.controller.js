const { findUserById, updateUserPlan } = require('../models/repositories/user.repository');

const changePlanController = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await findUserById(userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (user.plan !== 'plus') {
            return res.status(400).json({ message: 'Solo los usuarios en plan plus pueden cambiar a premium' });
        }

        const updated = await updateUserPlan(userId, 'premium');
        res.status(200).json({ message: 'Plan actualizado a premium', user: updated });
    } catch (err) {
        res.status(500).json({ message: 'Error interno' });
    }
};

module.exports = { changePlanController };
