import express from 'express';

const userRoute = express.Router();

userRoute.get('/user', (req, res) => {
  res.status(200).send({
    message: 'here again'
  });
});

module.exports = userRoute;
