const express = require('express');
const { getBooksController, getBookByIdController, postBookController, putBookController, deleteBookController } = require('../controllers/books.controller');
const payloadMiddleWare = require('../middlewares/payload.Middleware');
const bookSchema = require('./validations/books.validation');
const profileSchema = require('./validations/profile.validation');
const planLimitMiddleware = require('../middlewares/planLimit.Middleware');
const { changePlanController } = require('../controllers/profile.controller');
const router = express.Router();

router.get('/books', getBooksController);
router.get('/books/:id', getBookByIdController);

router.post('/books', payloadMiddleWare(bookSchema), planLimitMiddleware, postBookController);
router.put('/books/:id', payloadMiddleWare(bookSchema), putBookController);
router.delete('/books/:id', deleteBookController);


router.post('/profile/plan', payloadMiddleWare(profileSchema), changePlanController);

module.exports = router;