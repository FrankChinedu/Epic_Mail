import express from 'express';
import GroupController from '../controller/GroupController';
import Auth from '../middleware/Auth';

const groupRoute = express.Router();

groupRoute.post('/groups', Auth.verifyToken, Auth.magicValidator, GroupController.createGroup);
groupRoute.get('/groups', Auth.verifyToken, GroupController.getAllGroup);
groupRoute.patch('/groups/:id/name', Auth.verifyToken, Auth.magicValidator, GroupController.editGroup);
groupRoute.delete('/groups/:id', Auth.verifyToken, GroupController.deleteGroup);


module.exports = groupRoute;
