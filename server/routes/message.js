import express from 'express';
import MessageController from '../controller/MessageController';
import database from '../dummyData/Database';

const messageRoute = express.Router();

messageRoute.post('/messages', MessageController.createMessage);

// messageRoute.get('/messages', MessageController.getRecievedEmails);

messageRoute.get('/messages', (req, res) => {
  res.status(200).send({
    database,
  });
});

module.exports = messageRoute;
