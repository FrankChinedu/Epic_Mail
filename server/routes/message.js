import express from 'express';
import MessageController from '../controller/MessageController';
import Auth from '../middleware/Auth';

const messageRoute = express.Router();

messageRoute.post('/messages', Auth.verifyToken, MessageController.createMessage);

messageRoute.get('/messages/sent', MessageController.getSentEmails);

messageRoute.get('/messages', MessageController.getRecievedEmails);

messageRoute.get('/messages/:id', MessageController.viewAnInboxMessage);

messageRoute.get('/messages/unread', MessageController.getUnReadEmails);

messageRoute.delete('/messages/:id', MessageController.deleteAnInboxMessage);


module.exports = messageRoute;
