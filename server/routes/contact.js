import express from 'express';
import ContactController from '../controller/ContactController';
import Auth from '../middleware/Auth';

const contactRoute = express.Router();

contactRoute.post('/contacts', Auth.trimmer, Auth.verifyToken, Auth.magicValidator, ContactController.addContact);
contactRoute.get('/contacts', Auth.verifyToken, ContactController.getAllUserContacts);
contactRoute.delete('/contacts/:id', Auth.verifyToken, ContactController.deleteContact);

export default contactRoute;
