const express = require('express');
const authRouter = express.Router();
const { postAuthLogin, postAuthSingup } = require('../controllers/auth.controller'); 
const payLoadMiddleWare = require('../middlewares/payload.Middleware');
const { singupSchema }= require('./validations/auth.validation');


authRouter.post('/singup', payLoadMiddleWare(singupSchema), postAuthSingup);
authRouter.post('/login', postAuthLogin); 

module.exports = authRouter; 