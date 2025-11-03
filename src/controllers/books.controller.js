const Book = require('../models/books.model');
const sendEmail = require('../services/mailjet.service');
const {getBooks, findBook, createBook, deleteBook, updateBook} = require('../models/repositories/books.repository');

const getBooksController = async (req, res) => {
    const { id } = req.user;
    try {
        const books = await getBooks(id);
          if (books.length === 0) {
            res.status(200).json({ message: "No hay libros registrados para este usuario" });
        }

        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
 };

const getBookByIdController = async (req, res) => {
    const bookId = req.params.id;
    const { id } = req.user;
    try {
        const book = await findBook(bookId, id);
        if (book) {
            res.status(200).json(book);
            return;
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
            return;
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
        return;
    }
} 

const postBookController = async (req, res) => {
    const { body, user } = req;
    try {
        const existingBook = await Book.findOne({
            titulo: body.titulo,
            userId: user.id
        });

        if (existingBook) {
            return res.status(400).json({ message: 'El libro ya está registrado.' });
        }
        const newBook = await createBook(body, user.id);
        res.status(201).json({
            message: 'Libro registrado exitosamente',
            book: newBook
        });
    } catch (err) {
        res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
        return;
    }
};

const putBookController = async (req, res) => {
    const bookId = req.params.id;
    const {body} = req;    
    const { id } = req.user;
    try {
        const updated = await updateBook(bookId, id, body);
        if (updated) {
            res.status(200).json({message: "Libro actualizado correctamente",book: updated
            });
            return
        } else {
            res.status(404).json({ message: "Libro no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ message: 'Ha ocurrido un error en el servidor'});
    }
};

const deleteBookController = async (req, res) => {
    const bookId = req.params.id;
    const { id } = req.user;
    try {
        const deleted = await deleteBook(bookId, id);
       if (deleted.deletedCount > 0) {
            res.status(200).json({ message: "Libro eliminado correctamente" });
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
    }
};

module.exports = {
    getBooksController, 
    getBookByIdController,
    postBookController,
    putBookController,
    deleteBookController
};