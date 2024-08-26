import express from 'express';

import bookController from '../controller/book.controller.js';
const routerBook = express();

routerBook.post('/upload', bookController.uploadAndAddBook);
routerBook.put('/update/:id', bookController.updateBook);

export default routerBook;