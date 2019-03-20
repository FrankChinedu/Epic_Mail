"use strict";

var _express = _interopRequireDefault(require("express"));

var _GroupController = _interopRequireDefault(require("../controller/GroupController"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupRoute = _express.default.Router();

groupRoute.post('/groups', _Auth.default.trimmer, _Auth.default.verifyToken, _Auth.default.magicValidator, _GroupController.default.createGroup);
groupRoute.get('/groups', _Auth.default.verifyToken, _GroupController.default.getAllGroup);
groupRoute.patch('/groups/:id/name', _Auth.default.trimmer, _Auth.default.verifyToken, _Auth.default.magicValidator, _GroupController.default.editGroup);
groupRoute.delete('/groups/:id', _Auth.default.verifyToken, _GroupController.default.deleteGroup);
groupRoute.post('/groups/:id/users', _Auth.default.trimmer, _Auth.default.trimmer, _Auth.default.verifyToken, _GroupController.default.addMembersToGroup);
groupRoute.post('/groups/:groupId/messages', _Auth.default.trimmer, _Auth.default.verifyToken, _Auth.default.magicValidator, _GroupController.default.sendGroupMessage);
groupRoute.delete('/groups/:groupId/users/:memberId', _Auth.default.verifyToken, _GroupController.default.removeMemberFromGroup);
module.exports = groupRoute;