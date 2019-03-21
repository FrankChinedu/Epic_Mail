import express from 'express';
import Auth from '../middleware/Auth';
import UserController from '../controller/UserController';

const userRoute = express.Router();

userRoute.post('/auth/signup', Auth.trimmer, Auth.emailToLowerCase, Auth.validate, UserController.createUser);
userRoute.post('/auth/login', Auth.trimmer, Auth.emailToLowerCase, Auth.verifyLogin, UserController.login);
userRoute.post('/auth/reset', Auth.trimmer, UserController.reset);
userRoute.post('/auth/reset-password', Auth.trimmer, Auth.verifyToken, UserController.resetPassword);

module.exports = userRoute;
