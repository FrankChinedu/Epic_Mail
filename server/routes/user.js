import express from 'express';
import Auth from '../middleware/Auth';
import UserController from '../controller/UserController';

const userRoute = express.Router();

userRoute.post('/auth/signup', Auth.validate, UserController.createUser);
userRoute.post('/auth/login', UserController.login);
userRoute.post('/auth/reset', UserController.reset);

module.exports = userRoute;
