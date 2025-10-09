const express = require("express");
const publicRouter = express.Router();

const {
  healthController,
  pingController,
} = require("../controllers/public.controller");


publicRouter.get('/', (req, res) => {
  res.send('Bienvenido a la API!');
});

publicRouter.get("/health", healthController);
publicRouter.get("/ping", pingController);
publicRouter.get('/catalogs', (req, res) => {
  const { catalogsController } = require('../controllers/public.controller');
  return catalogsController(req, res);
});


module.exports = publicRouter;
