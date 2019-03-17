import express from 'express';
import ContactController from '../controller/ContactController';
import Auth from '../middleware/Auth';

const contactRoute = express.Router();

contactRoute.post('/conatcts', Auth.verifyToken, Auth.magicValidator, ContactController.addContact);
contactRoute.get('/contacts', Auth.verifyToken, ContactController.getAllUsersContacts);


module.exports = contactRoute;
