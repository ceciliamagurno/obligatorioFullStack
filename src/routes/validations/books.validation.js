const Joi = require('joi');
const { genres, countries } = require('../../models/catalogs');


const bookSchema = Joi.object({
    titulo: Joi.string().min(1).max(100).required(),
    autor: Joi.string().min(1).max(50).required(),
    fechaLectura: Joi.date().iso().required(),
    genero: Joi.string().valid(...genres).required(),
    pais: Joi.string().valid(...countries).required(),
    paginas: Joi.number().integer().min(1).required(),
    diasLeidos: Joi.number().integer().min(1).required()
});


module.exports = bookSchema;
