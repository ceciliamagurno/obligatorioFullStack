const Book = require('../books.model');

const getBooks = async (userId) => { 
    const books = await Book.find({ 
        userId: userId 
    }).select('id titulo autor fechaLectura genero pais paginas diasLeidos -_id'); 
    return books ;
};

const findBook = async (bookId, userId) => {
    return await Book.findOne({
        _id: bookId,
        userId: userId
    }).select('titulo autor -_id');
}

const createBook = async (body, userId) => {
    const newBook = new Book({
        titulo: body.titulo,
        autor: body.autor,
        fechaLectura: body.fechaLectura,
        genero: body.genero,
        pais: body.pais,
        paginas: body.paginas,
        diasLeidos: body.diasLeidos,
        userId: userId
    });
    await newBook.save();
     return await Book.findById(newBook._id)
        .select('titulo autor genero pais -_id');
}

const deleteBook = async (bookId, userId) => {
    return await Book.deleteOne({
        _id: bookId,
        userId: userId
    });
}

const updateBook = async (bookId, userId, payload) => {
    const book = await Book.findOne({
        _id: bookId,
        userId: userId
    })
    if (book) {
       Object.entries(payload).forEach(([key, value]) => {
           book[key] = value;
       }    );
       await book.save();
}
     return book ;
}

module.exports = {
    getBooks,
    findBook, 
    createBook,
    deleteBook,
    updateBook
}