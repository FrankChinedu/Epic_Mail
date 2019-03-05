import express from 'express';
import MessageController from '../controller/MessageController';

const messageRoute = express.Router();

messageRoute.post('/messages', MessageController.createUser);

messageRoute.get('/messages', (req, res) => {
  res.status(200).send({
    message: 'emails ----',
  });
});

module.exports = messageRoute;
