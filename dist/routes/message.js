"use strict";

var _express = _interopRequireDefault(require("express"));

var _MessageController = _interopRequireDefault(require("../controller/MessageController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageRoute = _express.default.Router();

messageRoute.post('/messages', _MessageController.default.createMessage);
messageRoute.get('/messages/unread', _MessageController.default.getUnReadEmails);
messageRoute.get('/messages', _MessageController.default.getRecievedEmails);
messageRoute.get('/messages/sent', _MessageController.default.getSentEmails);
messageRoute.get('/messages/:id', _MessageController.default.viewAnInboxMessage);
messageRoute.delete('/messages/:id', _MessageController.default.deleteAnInboxMessage);
module.exports = messageRoute;