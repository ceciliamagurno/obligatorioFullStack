const mongoose = require('mongoose');
const { genres, countries } = require('../../models/catalogs');


const bookSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true, minlength: 1, maxlength: 100 },
    autor: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    fechaLectura: { type: Date, required: true },
    genero: { type: String, required: true, enum: genres },
    pais: { type: String, required: true, enum: countries },
    paginas: { type: Number, required: true, min: 1, validate: { validator: Number.isInteger, message: '{VALUE} no es un entero válido para paginas' } },
    diasLeidos: { type: Number, required: true, min: 1, validate: { validator: Number.isInteger, message: '{VALUE} no es un entero válido para diasLeidos' } },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

}, 
{ timestamps: true }
);

module.exports = bookSchema;
