"use strict";

var _express = _interopRequireDefault(require("express"));

var _MessageController = _interopRequireDefault(require("../controller/MessageController"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageRoute = _express.default.Router();

messageRoute.post('/messages', _Auth.default.trimmer, _Auth.default.verifyToken, _Auth.default.spoof, _MessageController.default.createMessage);
messageRoute.get('/messages', _Auth.default.verifyToken, _MessageController.default.getRecievedEmails);
messageRoute.get('/messages/sent', _Auth.default.verifyToken, _MessageController.default.getSentEmails);
messageRoute.get('/messages/unread', _Auth.default.verifyToken, _MessageController.default.getUnReadEmails);
messageRoute.get('/messages/:id', _Auth.default.verifyToken, _MessageController.default.viewAnInboxMessage);
messageRoute.delete('/messages/:id', _Auth.default.verifyToken, _MessageController.default.deleteAnInboxMessage);
module.exports = messageRoute;