require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const sanitizeQuery = require('./middlewares/sanitize.Middleware');

const { loggerMiddleware } = require('./middlewares/logger.Middleware');
const { authMiddleware } = require('./middlewares/auth.Middleware');
const privateRouter = require ("./routes/private.router")
const publicRouter = require ("./routes/public.router")
const authRouter = require ("./routes/auth.router")
const connectMongoDB = require('./models/mongo.client');

// Conectar a MongoDB antes que nada
(async () => {
    try {
        await connectMongoDB(); 
    } catch (error) {
        console.error('No se pudo conectar a la base de datos.');
    }   
})();


// Middlewares
app.use(express.json()); 
app.use(morgan('dev'));
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(loggerMiddleware); 
app.use(sanitizeQuery);

// Rutas
app.use("/public", publicRouter);
app.use("/v1/auth", authRouter);
app.use("/v1", authMiddleware, privateRouter);
 
//Para que Vercel la use como handler
module.exports = app;

// Levantar el servidor en el puerto 3000 solo si se ejecuta directamente
if (require.main === module) {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log('Server is running on port 3000');
    })
};