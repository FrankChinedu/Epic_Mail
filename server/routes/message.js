import express from 'express';
import MessageController from '../controller/MessageController';
import Auth from '../middleware/Auth';

const messageRoute = express.Router();

messageRoute.post('/messages', Auth.trimmer, Auth.verifyToken, Auth.spoof, MessageController.createMessage);

messageRoute.get('/messages', Auth.verifyToken, MessageController.getRecievedEmails);

messageRoute.get('/messages/sent', Auth.verifyToken, MessageController.getSentEmails);

messageRoute.get('/messages/sent/:id', Auth.verifyToken, MessageController.viewASentMessage);

messageRoute.get('/messages/unread', Auth.verifyToken, MessageController.getUnReadEmails);

messageRoute.get('/messages/:id', Auth.verifyToken, MessageController.viewAnInboxMessage);

messageRoute.delete('/messages/:id', Auth.verifyToken, MessageController.deleteAnInboxMessage);
messageRoute.delete('/messages/sent/:id', Auth.verifyToken, MessageController.deleteASentMessage);


module.exports = messageRoute;
