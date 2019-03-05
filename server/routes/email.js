import express from 'express';
import EmailController from '../controller/EmailController';

const emailRoute = express.Router();

emailRoute.post('/email', EmailController.createUser);

emailRoute.get('/email', (req, res) => {
  res.status(200).send({
    message: 'emails ----',
  });
});

module.exports = emailRoute;
