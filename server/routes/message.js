import express from 'express';
import MessageController from '../controller/MessageController';
import Auth from '../middleware/Auth';

const messageRoute = express.Router();

messageRoute.post('/messages', Auth.trimmer, Auth.verifyToken, Auth.spoof, MessageController.createMessage);

messageRoute.get('/messages', Auth.verifyToken, MessageController.getRecievedEmails);

messageRoute.get('/messages/sent', Auth.verifyToken, MessageController.getSentEmails);

messageRoute.get('/messages/draft', Auth.verifyToken, MessageController.getDraftEmails);

// messageRoute.get('/messages/draft/:id', Auth.verifyToken, MessageController.viewADraftMessage);

messageRoute.get('/messages/sent/:id', Auth.verifyToken, MessageController.viewASentMessage);

messageRoute.get('/messages/unread', Auth.verifyToken, MessageController.getUnReadEmails);

messageRoute.get('/messages/:id', Auth.verifyToken, MessageController.viewAnInboxMessage);

messageRoute.delete('/messages/:id', Auth.verifyToken, MessageController.deleteAnInboxMessage);
messageRoute.delete('/messages/sent/:id', Auth.verifyToken, MessageController.deleteASentMessage);
messageRoute.delete('/messages/draft/:id', Auth.verifyToken, MessageController.deleteADraftMessage);


module.exports = messageRoute;
