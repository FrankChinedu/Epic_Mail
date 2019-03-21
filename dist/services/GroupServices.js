"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = require("../model/group");

var _groupMembers = require("../model/groupMembers");

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
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", _group.Group.deleteGroup(data));

              case 1:
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
    key: "addContactToGroup",
    value: function () {
      var _addContactToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(data) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _group.Group.addContactToGroup(data));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function addContactToGroup(_x5) {
        return _addContactToGroup.apply(this, arguments);
      }

      return addContactToGroup;
    }()
  }, {
    key: "removeMemberFromGroup",
    value: function () {
      var _removeMemberFromGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(data) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", _groupMembers.GroupMember.removeMemberFromGroup(data));

              case 1:
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
      regeneratorRuntime.mark(function _callee7(data) {
        var res, membersEmails, resp;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _groupMembers.GroupMember.retriveMembersEmails(data);

              case 2:
                res = _context7.sent;

                if (!res.success) {
                  _context7.next = 9;
                  break;
                }

                membersEmails = res.emails;
                _context7.next = 7;
                return _group.Group.sendGroupMessage(membersEmails, data);

              case 7:
                resp = _context7.sent;
                return _context7.abrupt("return", {
                  status: 201,
                  data: resp
                });

              case 9:
                return _context7.abrupt("return", res);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
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