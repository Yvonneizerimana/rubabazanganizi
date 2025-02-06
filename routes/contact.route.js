import express from 'express';
import contactController from "../controller/contact.controller.js";

const contactRouter=express.Router();

contactRouter.post('/create',contactController.addContact);

contactRouter.get('/getAll',contactController.getAllContacts);

contactRouter.get('/getContact/:id',contactController.getContactById);

contactRouter.delete('/deleteContact/:id',contactController.deleteContact);

export default contactRouter;
