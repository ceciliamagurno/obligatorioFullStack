const mongoose = require('mongoose');
const bookSchema = require('./schemas/books.schemas');

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;


/*const { isValidGenre, isValidCountry } = require('./catalogs');

const getBooks = (userId) => books.filter(book => book.userId === userId);

const findBook = (id) => books.find((book) => book.id == id);

const createBook = (body, userId) => {
    if (!isValidGenre(body.genero)) {
        throw new Error('Genero inválido');
    }
    if (!isValidCountry(body.pais)) {
        throw new Error('País inválido');
    }

    const lastBook = books[books.length - 1];
    const newBook = {
        id: lastBook ? lastBook.id + 1 : 1,
        titulo: body.titulo,
        autor: body.autor,
        fechaLectura: body.fechaLectura,
        genero: body.genero,
        pais: body.pais,
        paginas: body.paginas,
        diasLeidos: body.diasLeidos,
        userId: userId
    };
    if (lastBook) {
        newBook.id = lastBook.id + 1;
    } else {
        newBook.id = 1;
    }    
    books.push(newBook);
    return newBook;
}

const deleteBook = (id) => {
    let indexToBeDeleted = books.findIndex((book) => book.id == id);
    if (indexToBeDeleted >= 0) {
        books.splice(indexToBeDeleted, 1);
        return true;
    } else {
        return false;
    }
}

const updateBook = (id, payload) => {
    if (payload && payload.genero && !isValidGenre(payload.genero)) {
        throw new Error('Genero inválido');
    }
    if (payload && payload.pais && !isValidCountry(payload.pais)) {
        throw new Error('País inválido');
    }

    let index = books.findIndex((b) => b.id == id);
    if (index >= 0) {
        books[index] = { ...books[index], ...payload };
    }
    return books[index];
}

module.exports = {
    getBooks,
    findBook,
    createBook,
    updateBook,
    deleteBook,
}*/