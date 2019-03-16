import express from 'express';
import GroupController from '../controller/GroupController';
import Auth from '../middleware/Auth';

const groupRoute = express.Router();

groupRoute.post('/groups', Auth.verifyToken, Auth.magicValidate, GroupController.createGroup);


module.exports = groupRoute;
