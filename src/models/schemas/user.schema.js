const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, enum: ['plus', 'premium'], default: 'plus' },
    active: { type: Boolean, default: true },
    
},
{ timestamps: true }
);


module.exports =  userSchema;