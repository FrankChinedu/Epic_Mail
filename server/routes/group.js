import express from 'express';
import GroupController from '../controller/GroupController';
import Auth from '../middleware/Auth';

const groupRoute = express.Router();

groupRoute.post('/groups', Auth.verifyToken, Auth.magicValidator, GroupController.createGroup);
groupRoute.get('/groups', Auth.verifyToken, GroupController.getAllGroup);


module.exports = groupRoute;
