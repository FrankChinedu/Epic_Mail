import express from 'express';
import MessageController from '../controller/MessageController';

const messageRoute = express.Router();

messageRoute.post('/messages', MessageController.createMessage);

messageRoute.get('/messages/sent', MessageController.getSentEmails);

messageRoute.get('/messages', MessageController.getRecievedEmails);

messageRoute.get('/messages/unread', MessageController.getUnReadEmails);

messageRoute.get('/messages/:id', MessageController.viewAnInboxMessage);

messageRoute.delete('/messages/:id', MessageController.deleteAnInboxMessage);

module.exports = messageRoute;
