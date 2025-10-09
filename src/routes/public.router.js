const express = require("express");
const publicRouter = express.Router();

const {
  healthController,
  pingController,
} = require("../controllers/public.controller");

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando, ruta pública' });
});


publicRouter.get("/health", healthController);
publicRouter.get("/ping", pingController);
publicRouter.get('/catalogs', (req, res) => {
  const { catalogsController } = require('../controllers/public.controller');
  return catalogsController(req, res);
});


module.exports = publicRouter;
