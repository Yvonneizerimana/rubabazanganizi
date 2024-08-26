import express from 'express';

import bookController from '../controller/book.controller.js';
const routerBook = express();

routerBook.post('/addBook', bookController.uploadAndAddBook);
routerBook.put('/updateBook/:id', bookController.updateBook);
routerBook.get('/getOneBook/:id', bookController.getBookById);
routerBook.get('/getAllBooks', bookController.getAllBooks);
routerBook.delete('/deleteBook/:id', bookController.deleteBook);

export default routerBook;