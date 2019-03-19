"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sent = require("../model/sent");

var _inbox = require("../model/inbox");

var _email = require("../model/email");

var _draft = require("../model/draft");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageServices =
/*#__PURE__*/
function () {
  function MessageServices() {
    _classCallCheck(this, MessageServices);
  }

  _createClass(MessageServices, null, [{
    key: "saveDraft",
    value: function () {
      var _saveDraft = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(data) {
        var userId, recieversEmail, res, receiverId, msg, messageId, inserts, fromDraft, info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = data.userId, recieversEmail = data.recieversEmail;
                _context.next = 3;
                return _email.Email.getMessageReceiverId(recieversEmail);

              case 3:
                res = _context.sent;
                receiverId = null;

                if (res.success) {
                  receiverId = res.id;
                }

                _context.next = 8;
                return _email.Email.createMessage(data);

              case 8:
                msg = _context.sent;

                if (msg.success) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", {
                  status: 401,
                  error: msg.error
                });

              case 11:
                msg = msg.data;
                messageId = msg.id;
                inserts = {
                  userId: userId,
                  messageId: messageId,
                  receiverId: receiverId
                };
                _context.next = 16;
                return _draft.Draft.insertIntoDraftTable(inserts);

              case 16:
                fromDraft = _context.sent;

                if (fromDraft.success) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", {
                  status: 401,
                  error: fromDraft.error
                });

              case 19:
                info = {
                  id: messageId,
                  createdOn: msg.createdat,
                  subject: msg.subject,
                  message: msg.message,
                  parentMessageId: msg.parentMessageId,
                  status: msg.status
                };
                return _context.abrupt("return", {
                  status: 201,
                  message: 'draft saved successfully',
                  data: [info]
                });

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function saveDraft(_x) {
        return _saveDraft.apply(this, arguments);
      }

      return saveDraft;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(data) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.send(data);

              case 2:
                res = _context2.sent;

                if (!res.success) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", {
                  status: 201,
                  message: 'message sent successfully',
                  data: [res.info]
                });

              case 5:
                return _context2.abrupt("return", {
                  status: res.status,
                  data: [{
                    message: res.error
                  }]
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function sendMessage(_x2) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(data) {
        var userId, recieversEmail, res, receiverId, msg, messageId, inserts, result, fromSent, info;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = data.userId, recieversEmail = data.recieversEmail;
                _context3.next = 3;
                return _email.Email.getMessageReceiverId(recieversEmail);

              case 3:
                res = _context3.sent;

                if (res.success) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", {
                  success: false,
                  status: 401,
                  error: res.error
                });

              case 6:
                receiverId = res.id;
                _context3.next = 9;
                return _email.Email.createMessage(data);

              case 9:
                msg = _context3.sent;

                if (msg.success) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", {
                  success: false,
                  status: 401,
                  error: msg.error
                });

              case 12:
                msg = msg.data;
                messageId = msg.id;
                inserts = {
                  userId: userId,
                  messageId: messageId,
                  receiverId: receiverId
                };
                _context3.next = 17;
                return _inbox.Inbox.insertIntoInboxTable(inserts);

              case 17:
                result = _context3.sent;

                if (result.success) {
                  _context3.next = 20;
                  break;
                }

                return _context3.abrupt("return", {
                  success: false,
                  status: 401,
                  error: result.error
                });

              case 20:
                _context3.next = 22;
                return _sent.Sent.insertIntoSentTable(inserts);

              case 22:
                fromSent = _context3.sent;

                if (fromSent.success) {
                  _context3.next = 25;
                  break;
                }

                return _context3.abrupt("return", {
                  success: false,
                  status: 401,
                  error: fromSent.error
                });

              case 25:
                info = {
                  id: messageId,
                  createdOn: msg.createdat,
                  subject: msg.subject,
                  message: msg.message,
                  parentMessageId: msg.parentmessageid,
                  status: msg.status
                };
                return _context3.abrupt("return", {
                  success: true,
                  info: info
                });

              case 27:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function send(_x3) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "getRecievedEmails",
    value: function () {
      var _getRecievedEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(userId) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _email.Email.getInboxMessages(userId);

              case 2:
                response = _context4.sent;

                if (!response.success) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", {
                  status: 200,
                  data: response.data
                });

              case 5:
                return _context4.abrupt("return", {
                  status: 500,
                  error: response.error
                });

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getRecievedEmails(_x4) {
        return _getRecievedEmails.apply(this, arguments);
      }

      return getRecievedEmails;
    }()
  }, {
    key: "getSentEmails",
    value: function () {
      var _getSentEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(userId) {
        var response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _email.Email.getSentEmails(userId);

              case 2:
                response = _context5.sent;

                if (!response.success) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", {
                  status: 200,
                  data: response.data
                });

              case 5:
                return _context5.abrupt("return", {
                  status: 500,
                  error: response.error
                });

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getSentEmails(_x5) {
        return _getSentEmails.apply(this, arguments);
      }

      return getSentEmails;
    }()
  }, {
    key: "getUnReadEmails",
    value: function () {
      var _getUnReadEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(userId) {
        var response, message, res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _email.Email.getInboxMessages(userId);

              case 2:
                response = _context6.sent;
                message = [{
                  message: 'No unread messages'
                }];

                if (!response.success) {
                  _context6.next = 11;
                  break;
                }

                if (response.empty) {
                  _context6.next = 10;
                  break;
                }

                res = response.data[0];
                res = res.filter(function (data) {
                  return data.read === false;
                });

                if (!res.length) {
                  res = message;
                }

                return _context6.abrupt("return", {
                  status: 200,
                  data: res
                });

              case 10:
                return _context6.abrupt("return", {
                  status: 200,
                  data: message
                });

              case 11:
                return _context6.abrupt("return", {
                  status: 500,
                  error: response.error
                });

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getUnReadEmails(_x6) {
        return _getUnReadEmails.apply(this, arguments);
      }

      return getUnReadEmails;
    }()
  }, {
    key: "viewAnInboxMessage",
    value: function () {
      var _viewAnInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_ref) {
        var userId, messageId, result, response, res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                userId = _ref.userId, messageId = _ref.messageId;
                _context7.next = 3;
                return _email.Email.getAnInboxMessage({
                  userId: userId,
                  messageId: messageId
                });

              case 3:
                result = _context7.sent;

                if (!result.success) {
                  _context7.next = 11;
                  break;
                }

                _context7.next = 7;
                return _email.Email.getInboxMessages(userId);

              case 7:
                response = _context7.sent;
                res = response.data[0];
                res = res.find(function (data) {
                  return data.id === parseInt(messageId, 0);
                });
                return _context7.abrupt("return", {
                  status: 200,
                  data: [res]
                });

              case 11:
                return _context7.abrupt("return", {
                  status: 404,
                  data: result.data
                });

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function viewAnInboxMessage(_x7) {
        return _viewAnInboxMessage.apply(this, arguments);
      }

      return viewAnInboxMessage;
    }()
  }, {
    key: "deleteAnInboxMessage",
    value: function () {
      var _deleteAnInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(data) {
        var response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _email.Email.deleteInboxMessage(data);

              case 2:
                response = _context8.sent;

                if (!response.success) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt("return", {
                  status: 202,
                  data: response.data
                });

              case 5:
                return _context8.abrupt("return", {
                  status: 500,
                  error: response.error
                });

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function deleteAnInboxMessage(_x8) {
        return _deleteAnInboxMessage.apply(this, arguments);
      }

      return deleteAnInboxMessage;
    }()
  }]);

  return MessageServices;
}();

exports.default = MessageServices;