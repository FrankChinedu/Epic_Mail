import express from 'express';
import Auth from '../middleware/Auth';
import UserController from '../controller/UserController';

const userRoute = express.Router();

userRoute.post('/auth/signup', Auth.validate, Auth.emailExist, UserController.createUser);

userRoute.get('/allUsers', UserController.allUsers);

userRoute.get('/user', (req, res) => {
  res.status(200).send({
    message: 'users ----',
  });
});

module.exports = userRoute;
