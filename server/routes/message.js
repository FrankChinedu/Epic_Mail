import express from 'express';
import MessageController from '../controller/MessageController';
import database from '../dummyData/Database';

const messageRoute = express.Router();

messageRoute.post('/messages', MessageController.createMessage);

messageRoute.get('/messages/sent', MessageController.getSentEmails);

messageRoute.get('/messages', MessageController.getRecievedEmails);

messageRoute.get('/messages/:id', MessageController.viewAnInboxMessage);

messageRoute.get('/messages/unread', MessageController.getUnReadEmails);

messageRoute.delete('/messages/:id', MessageController.deleteAnInboxMessage);

// messageRoute.get('/getAllData', (req, res) => {
//   res.status(200).send({
//     database,
//   });
// });

module.exports = messageRoute;
