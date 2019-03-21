"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _email = require("../model/email");

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
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _email.Email.saveDraft(data));

              case 1:
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
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _email.Email.sendMessage(data));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function sendMessage(_x2) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }, {
    key: "getRecievedEmails",
    value: function () {
      var _getRecievedEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(userId) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _email.Email.getInboxMessages(userId);

              case 2:
                response = _context3.sent;

                if (!response.success) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", {
                  status: 200,
                  data: response.data
                });

              case 5:
                return _context3.abrupt("return", {
                  status: 500,
                  error: response.error
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getRecievedEmails(_x3) {
        return _getRecievedEmails.apply(this, arguments);
      }

      return getRecievedEmails;
    }()
  }, {
    key: "getSentEmails",
    value: function () {
      var _getSentEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(userId) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _email.Email.getSentEmails(userId);

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

      function getSentEmails(_x4) {
        return _getSentEmails.apply(this, arguments);
      }

      return getSentEmails;
    }()
  }, {
    key: "getUnReadEmails",
    value: function () {
      var _getUnReadEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(userId) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _email.Email.getUnReadEmails(userId));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getUnReadEmails(_x5) {
        return _getUnReadEmails.apply(this, arguments);
      }

      return getUnReadEmails;
    }()
  }, {
    key: "viewAnInboxMessage",
    value: function () {
      var _viewAnInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref) {
        var userId, messageId;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userId = _ref.userId, messageId = _ref.messageId;
                return _context6.abrupt("return", _email.Email.getAnInboxMessage({
                  userId: userId,
                  messageId: messageId
                }));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function viewAnInboxMessage(_x6) {
        return _viewAnInboxMessage.apply(this, arguments);
      }

      return viewAnInboxMessage;
    }()
  }, {
    key: "deleteAnInboxMessage",
    value: function () {
      var _deleteAnInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(data) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", _email.Email.deleteInboxMessage(data));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function deleteAnInboxMessage(_x7) {
        return _deleteAnInboxMessage.apply(this, arguments);
      }

      return deleteAnInboxMessage;
    }()
  }]);

  return MessageServices;
}();

exports.default = MessageServices;