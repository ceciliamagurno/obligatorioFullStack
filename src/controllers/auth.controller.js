const jwt = require('jsonwebtoken');
const { findUserByUserName, saveUser, isValidPassword } = require('../models/repositories/user.repository');

const postAuthLogin = async (req, res) => {
    const body = req.body;
    const { username, password } = body;
    const user = await findUserByUserName(username);
    if (!user) {
        res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        return;
    }

    const isValidPass = await isValidPassword(password, user.password);

    if (!isValidPass) {
        res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        return;
    }
    
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: '1h' }
    );


    res.status(200).json({ message: 'Login exitoso', token });
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