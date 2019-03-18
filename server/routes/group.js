import express from 'express';
import GroupController from '../controller/GroupController';
import Auth from '../middleware/Auth';

const groupRoute = express.Router();

groupRoute.post('/groups', Auth.verifyToken, Auth.magicValidator, GroupController.createGroup);
groupRoute.get('/groups', Auth.verifyToken, GroupController.getAllGroup);
groupRoute.patch('/groups/:id/name', Auth.verifyToken, Auth.magicValidator, GroupController.editGroup);
groupRoute.delete('/groups/:id', Auth.verifyToken, GroupController.deleteGroup);
groupRoute.post('/groups/:id/users', Auth.verifyToken, GroupController.addMembersToGroup);
groupRoute.post('/groups/:groupId/messages', Auth.verifyToken, GroupController.sendGroupMessage);
groupRoute.delete('/groups/:groupId/users/:memberId', Auth.verifyToken, GroupController.removeMemberFromGroup);


module.exports = groupRoute;
