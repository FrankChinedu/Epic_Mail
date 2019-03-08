"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Database = require("../dummyData/Database");

var _message = _interopRequireDefault(require("../model/message"));

var _inbox = _interopRequireDefault(require("../model/inbox"));

var _sent = _interopRequireDefault(require("../model/sent"));

var _draft = _interopRequireDefault(require("../model/draft"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var messageServices =
/*#__PURE__*/
function () {
  function messageServices() {
    _classCallCheck(this, messageServices);
  }

  _createClass(messageServices, null, [{
    key: "createMessage",
    value: function createMessage(_ref) {
      var subject = _ref.subject,
          message = _ref.message,
          status = _ref.status;
      var msg = new _message.default();
      msg.id = _Database.messages[_Database.messages.length - 1].id + 1;
      msg.subject = subject;
      msg.message = message;
      msg.status = status;

      _Database.messages.push(msg);

      return msg;
    }
  }, {
    key: "filteredMessage",
    value: function filteredMessage(msgs) {
      var response = [];
      msgs.forEach(function (inbox) {
        var mail = _Database.messages.find(function (data) {
          return data.id === inbox.messageId;
        });

        var subject = mail.subject,
            message = mail.message,
            parentMessageId = mail.parentMessageId;
        var id = inbox.id,
            createdOn = inbox.createdOn,
            read = inbox.read,
            status = inbox.status,
            senderId = inbox.senderId,
            receiverId = inbox.receiverId;
        response.push({
          id: id,
          createdOn: createdOn,
          subject: subject,
          message: message,
          senderId: senderId,
          receiverId: receiverId,
          parentMessageId: parentMessageId,
          status: status,
          read: read
        });
      });
      return response;
    }
  }, {
    key: "getUsersMessages",
    value: function getUsersMessages(userId) {
      var msgs = _Database.inboxs.filter(function (data) {
        return data.receiverId === userId;
      });

      var response = this.filteredMessage(msgs);
      return response;
    }
  }, {
    key: "getSentEmails",
    value: function getSentEmails(userId) {
      var msgs = _Database.sents.filter(function (data) {
        return data.senderId === userId;
      });

      var response = this.filteredMessage(msgs);
      return {
        status: 200,
        data: response
      };
    }
  }, {
    key: "getUnReadEmails",
    value: function getUnReadEmails(userId) {
      var response = this.getUsersMessages(userId);
      var res = response.filter(function (data) {
        return data.read === false;
      });
      return {
        status: 200,
        data: res
      };
    }
  }, {
    key: "deleteAnInboxMessage",
    value: function deleteAnInboxMessage(_ref2) {
      var userId = _ref2.userId,
          id = _ref2.id;
      var response = 'unsuccessful';

      var inboxId = _Database.inboxs.findIndex(function (data) {
        return data.senderId === parseInt(userId, 10) && data.messageId === parseInt(id, 10);
      });

      if (inboxId !== -1) {
        _Database.inboxs.splice(inboxId, 1);

        response = 'deleted successfully';
      } else {
        response = 'not found';
      }

      return {
        status: 202,
        data: [{
          message: response
        }]
      };
    }
  }, {
    key: "viewAnInboxMessage",
    value: function viewAnInboxMessage(_ref3) {
      var userId = _ref3.userId,
          id = _ref3.id;

      var inbox = _Database.inboxs.find(function (data) {
        return data.receiverId === parseInt(userId, 10) && data.id === parseInt(id, 10);
      });

      var response = [];

      if (inbox) {
        var msg = _Database.messages.find(function (data) {
          return data.id === parseInt(inbox.messageId, 10);
        });

        var subject = msg.subject,
            message = msg.message,
            parentMessageId = msg.parentMessageId;
        var createdOn = inbox.createdOn,
            read = inbox.read,
            status = inbox.status,
            senderId = inbox.senderId,
            receiverId = inbox.receiverId;
        response.push({
          id: inbox.id,
          createdOn: createdOn,
          read: read,
          status: status,
          senderId: senderId,
          receiverId: receiverId,
          subject: subject,
          message: message,
          parentMessageId: parentMessageId
        });
      } else {
        response = [{
          message: 'not found'
        }];
      }

      return {
        status: 200,
        data: response
      };
    }
  }, {
    key: "getRecievedEmails",
    value: function getRecievedEmails(userId) {
      var response = this.getUsersMessages(userId);
      return {
        status: 200,
        data: response
      };
    }
  }, {
    key: "saveDraft",
    value: function saveDraft(data) {
      var userId = data.userId,
          contactEmail = data.contactEmail;
      var receiverId = this.getMessageReceiverId(contactEmail);
      var message = this.createMessage(data);
      var draft = new _draft.default();
      draft.id = _Database.drafts[_Database.drafts.length - 1].id + 1;
      draft.senderId = userId;
      draft.receiverId = receiverId;
      draft.messageId = message.id;

      _Database.drafts.push(draft);

      return {
        status: 201,
        message: 'draft saved successfully',
        data: [message]
      };
    }
  }, {
    key: "getMessageReceiverId",
    value: function getMessageReceiverId(email) {
      var user = _Database.users.find(function (data) {
        return data.email === email;
      });

      if (user) {
        return user.id;
      }

      return null;
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(data) {
      var userId = data.userId,
          contactEmail = data.contactEmail;
      var receiverId = this.getMessageReceiverId(contactEmail);
      var message = this.createMessage(data);
      var inbox = new _inbox.default();
      inbox.id = _Database.drafts[_Database.drafts.length - 1].id + 1;
      inbox.receiverId = receiverId;
      inbox.senderId = userId;
      inbox.messageId = message.id;

      _Database.inboxs.push(inbox);

      var sent = new _sent.default();
      sent.id = _Database.sents[_Database.sents.length - 1].id + 1;
      sent.messageId = message.id;
      sent.senderId = userId;
      sent.receiverId = receiverId;

      _Database.sents.push(sent);

      return {
        status: 201,
        message: 'message sent successfully',
        data: [message]
      };
    }
  }]);

  return messageServices;
}();

exports.default = messageServices;