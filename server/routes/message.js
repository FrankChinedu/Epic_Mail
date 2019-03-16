import express from 'express';
import MessageController from '../controller/MessageController';
import Auth from '../middleware/Auth';

const messageRoute = express.Router();

messageRoute.post('/messages', Auth.verifyToken, MessageController.createMessage);

messageRoute.get('/messages/sent', Auth.verifyToken, MessageController.getSentEmails);

messageRoute.get('/messages', Auth.verifyToken, MessageController.getRecievedEmails);

messageRoute.get('/messages/unread', Auth.verifyToken, MessageController.getUnReadEmails);

messageRoute.get('/messages/:id', MessageController.viewAnInboxMessage);

messageRoute.delete('/messages/:id', MessageController.deleteAnInboxMessage);


module.exports = messageRoute;
