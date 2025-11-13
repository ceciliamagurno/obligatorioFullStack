const jwt = require('jsonwebtoken');
const { findUserByUserName, saveUser, isValidPassword } = require('../models/repositories/user.repository');

const postAuthLogin = async (req, res) => {
    try {
        const body = req.body;
        const { username, password } = body;
        const user = await findUserByUserName(username);
        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const isValidPass = await isValidPassword(password, user.password);

        if (!isValidPass) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const secret = process.env.AUTH_SECRET_KEY;
        if (!secret) {
            console.error('AUTH_SECRET_KEY no está definido en las variables de entorno');
            return res.status(500).json({ message: 'Error de configuración del servidor' });
        }

        // Incluye el plan en el payload del JWT (ajusta 'user.plan' si el campo se llama diferente)
        const token = jwt.sign(
            { id: user.id || user._id, username: user.username, plan: user.plan },  // Agregado 'plan'
            secret,
            { expiresIn: '1h' }
        );

        // Devuelve el token y el plan en la respuesta
        return res.status(200).json({ 
            message: 'Login exitoso', 
            token, 
            plan: user.plan  // Agregado para que el frontend lo guarde fácilmente
        });
    } catch (err) {
        console.error('Error en postAuthLogin:', err);
        return res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
    }
}

const postAuthSingup = async (req, res) => {
    const { name, username, password } = req.body;

    const existing = await findUserByUserName(username);
    if (existing) {
        res.status(409).json({ message: 'El nombre de usuario ya esta en uso' });
        return;
    }
    
    try {
        const newUser = await saveUser(name, username, password);
        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}

module.exports = {
    postAuthLogin,
    postAuthSingup
}