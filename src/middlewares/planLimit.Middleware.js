const { findUserById } = require('../models/repositories/user.repository');
const { getBooks } = require('../models/repositories/books.repository');

const planLimitMiddleware = async (req, res, next) => {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ message: 'Usuario no autenticado' });

  const user = await findUserById(userId);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  if (user.plan === 'premium') return next();

  const books = await getBooks(userId);
  if (books && books.length >= 10) {
    return res.status(403).json({
      message: 'Has alcanzado el límite de 10 libros para el plan plus. Actualiza a premium para agregar más.'
    });
  }

  next();
};

module.exports = planLimitMiddleware;
