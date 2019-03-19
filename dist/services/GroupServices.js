"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = require("../model/group");

var _groupMembers = require("../model/groupMembers");

var _sent = require("../model/sent");

var _email = require("../model/email");

var _Helpers = _interopRequireDefault(require("../helpers/Helpers"));

var _inbox = require("../model/inbox");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserServices =
/*#__PURE__*/
function () {
  function UserServices() {
    _classCallCheck(this, UserServices);
  }

  _createClass(UserServices, null, [{
    key: "createGroup",
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(data) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _group.Group.createGroup(data);

              case 2:
                res = _context.sent;
                return _context.abrupt("return", {
                  status: 201,
                  message: 'group created successfully',
                  data: [res.data]
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createGroup(_x) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "getAllGroup",
    value: function () {
      var _getAllGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(userId) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _group.Group.getAllGroup(userId);

              case 2:
                response = _context2.sent;
                return _context2.abrupt("return", {
                  status: 200,
                  data: response.data
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllGroup(_x2) {
        return _getAllGroup.apply(this, arguments);
      }

      return getAllGroup;
    }()
  }, {
    key: "editGroup",
    value: function () {
      var _editGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(data) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _group.Group.editGroup(data);

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
                  status: 404,
                  data: response.data
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function editGroup(_x3) {
        return _editGroup.apply(this, arguments);
      }

      return editGroup;
    }()
  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(data) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _group.Group.deleteGroup(data);

              case 2:
                response = _context4.sent;

                if (!response.success) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", {
                  status: 202,
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

      function deleteGroup(_x4) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }, {
    key: "addMembersToGroup",
    value: function () {
      var _addMembersToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(data) {
        var res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _group.Group.addMembersToGroup(data);

              case 2:
                res = _context5.sent;

                if (!res.success) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", {
                  status: 200,
                  data: res.data
                });

              case 5:
                return _context5.abrupt("return", {
                  status: 400,
                  data: res.data
                });

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function addMembersToGroup(_x5) {
        return _addMembersToGroup.apply(this, arguments);
      }

      return addMembersToGroup;
    }()
  }, {
    key: "removeMemberFromGroup",
    value: function () {
      var _removeMemberFromGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(data) {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _groupMembers.GroupMember.removeMemberFromGroup(data);

              case 2:
                res = _context6.sent;

                if (!res.success) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return", {
                  status: 202,
                  data: res.data
                });

              case 5:
                return _context6.abrupt("return", {
                  status: 403,
                  data: res.data
                });

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function removeMemberFromGroup(_x6) {
        return _removeMemberFromGroup.apply(this, arguments);
      }

      return removeMemberFromGroup;
    }()
  }, {
    key: "sendGroupMessage",
    value: function () {
      var _sendGroupMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(data) {
        var res, userId, membersEmails, details, msg, messageId, info;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _groupMembers.GroupMember.retriveMembersEmails(data);

              case 2:
                res = _context8.sent;
                userId = data.userId;

                if (!res.success) {
                  _context8.next = 16;
                  break;
                }

                membersEmails = res.emails;
                details = _objectSpread({}, data);
                _context8.next = 9;
                return _email.Email.createMessage(details);

              case 9:
                msg = _context8.sent;
                msg = msg.data;
                messageId = msg.id;
                _context8.next = 14;
                return _Helpers.default.asyncForEach(membersEmails,
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee7(recieversEmail) {
                    var result, receiverId, inserts;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return _email.Email.getMessageReceiverId(recieversEmail);

                          case 2:
                            result = _context7.sent;
                            receiverId = result.id;
                            inserts = {
                              userId: userId,
                              messageId: messageId,
                              receiverId: receiverId
                            };
                            _context7.next = 7;
                            return _inbox.Inbox.insertIntoInboxTable(inserts);

                          case 7:
                            _context7.next = 9;
                            return _sent.Sent.insertIntoSentTable(inserts);

                          case 9:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x8) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 14:
                info = {
                  id: messageId,
                  createdOn: msg.createdat,
                  subject: msg.subject,
                  message: msg.message,
                  parentMessageId: msg.parentmessageid,
                  status: msg.status
                };
                return _context8.abrupt("return", {
                  status: 201,
                  data: [info]
                });

              case 16:
                return _context8.abrupt("return", {
                  status: 400,
                  data: res.data
                });

              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function sendGroupMessage(_x7) {
        return _sendGroupMessage.apply(this, arguments);
      }

      return sendGroupMessage;
    }()
  }]);

  return UserServices;
}();

exports.default = UserServices;