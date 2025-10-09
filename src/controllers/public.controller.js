const pingController = (req, res) => {
    res.status(200).send('Pong');
};

const healthController = (req, res) => {
    res.status(200).send('OK');
};

const { genres, countries } = require('../models/catalogs');

const catalogsController = (req, res) => {
    res.status(200).json({ genres, countries });
};

module.exports = { pingController, healthController, catalogsController };

