import express from 'express';

import bookController from '../controller/book.controller.js';
const routerBook = express();
routerBook.post('/upload', bookController.uploadAndAddBook);

export default routerBook;