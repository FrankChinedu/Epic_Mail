"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MessageServices = _interopRequireDefault(require("../services/MessageServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageController =
/*#__PURE__*/
function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: "createMessage",
    value: function () {
      var _createMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var userId, data, status, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = req.user.id;
                data = _objectSpread({}, req.body, {
                  userId: userId
                });
                status = data.status;

                if (!(status === 'sent')) {
                  _context.next = 9;
                  break;
                }

                _context.next = 6;
                return MessageController.sendMessage(data);

              case 6:
                response = _context.sent;
                _context.next = 12;
                break;

              case 9:
                _context.next = 11;
                return MessageController.saveAsDraft(data);

              case 11:
                response = _context.sent;

              case 12:
                res.status(response.status).send(response);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createMessage(_x, _x2) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
  }, {
    key: "saveAsDraft",
    value: function () {
      var _saveAsDraft = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(data) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _MessageServices.default.saveDraft(data));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function saveAsDraft(_x3) {
        return _saveAsDraft.apply(this, arguments);
      }

      return saveAsDraft;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(data) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _MessageServices.default.sendMessage(data));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function sendMessage(_x4) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }, {
    key: "getRecievedEmails",
    value: function () {
      var _getRecievedEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var userId, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userId = req.user.id;
                _context4.next = 3;
                return _MessageServices.default.getRecievedEmails(userId);

              case 3:
                response = _context4.sent;
                res.status(response.status).send(response);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getRecievedEmails(_x5, _x6) {
        return _getRecievedEmails.apply(this, arguments);
      }

      return getRecievedEmails;
    }()
  }, {
    key: "getSentEmails",
    value: function () {
      var _getSentEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var userId, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userId = req.user.id;
                _context5.next = 3;
                return _MessageServices.default.getSentEmails(userId);

              case 3:
                response = _context5.sent;
                res.status(response.status).send(response);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getSentEmails(_x7, _x8) {
        return _getSentEmails.apply(this, arguments);
      }

      return getSentEmails;
    }()
  }, {
    key: "getUnReadEmails",
    value: function () {
      var _getUnReadEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var userId, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userId = req.user.id;
                _context6.next = 3;
                return _MessageServices.default.getUnReadEmails(userId);

              case 3:
                response = _context6.sent;
                res.status(response.status).send(response);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getUnReadEmails(_x9, _x10) {
        return _getUnReadEmails.apply(this, arguments);
      }

      return getUnReadEmails;
    }()
  }, {
    key: "viewAnInboxMessage",
    value: function () {
      var _viewAnInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res) {
        var userId, id, messageId, data, response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                userId = req.user.id;
                id = req.params.id;
                messageId = id;
                data = {
                  userId: userId,
                  messageId: messageId
                };
                _context7.next = 6;
                return _MessageServices.default.viewAnInboxMessage(data);

              case 6:
                response = _context7.sent;
                res.status(response.status).send(response);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function viewAnInboxMessage(_x11, _x12) {
        return _viewAnInboxMessage.apply(this, arguments);
      }

      return viewAnInboxMessage;
    }()
  }, {
    key: "deleteAnInboxMessage",
    value: function () {
      var _deleteAnInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(req, res) {
        var userId, id, data, response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                userId = req.user.id;
                id = req.params.id;
                data = {
                  userId: userId,
                  id: id
                };
                _context8.next = 5;
                return _MessageServices.default.deleteAnInboxMessage(data);

              case 5:
                response = _context8.sent;
                res.status(response.status).send(response);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function deleteAnInboxMessage(_x13, _x14) {
        return _deleteAnInboxMessage.apply(this, arguments);
      }

      return deleteAnInboxMessage;
    }()
  }]);

  return MessageController;
}();

exports.default = MessageController;