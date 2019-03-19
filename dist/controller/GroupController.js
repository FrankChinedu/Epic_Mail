"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GroupServices = _interopRequireDefault(require("../services/GroupServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "createGroup",
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var userId, data, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = req.user.id;
                data = _objectSpread({}, req.body, {
                  userId: userId
                });
                _context.next = 4;
                return _GroupServices.default.createGroup(data);

              case 4:
                response = _context.sent;
                res.status(201).send(response);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createGroup(_x, _x2) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "getAllGroup",
    value: function () {
      var _getAllGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var userId, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = req.user.id;
                _context2.next = 3;
                return _GroupServices.default.getAllGroup(userId);

              case 3:
                response = _context2.sent;
                res.status(200).send(response);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllGroup(_x3, _x4) {
        return _getAllGroup.apply(this, arguments);
      }

      return getAllGroup;
    }()
  }, {
    key: "editGroup",
    value: function () {
      var _editGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var userId, id, name, data, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = req.user.id;
                id = req.params.id;
                name = req.body.name;
                data = {
                  userId: userId,
                  id: id,
                  name: name
                };
                _context3.next = 6;
                return _GroupServices.default.editGroup(data);

              case 6:
                response = _context3.sent;

                if (response.status === 200) {
                  res.status(200).send(response);
                } else {
                  res.status(404).send(response);
                }

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function editGroup(_x5, _x6) {
        return _editGroup.apply(this, arguments);
      }

      return editGroup;
    }()
  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var userId, id, data, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userId = req.user.id;
                id = req.params.id;
                data = {
                  userId: userId,
                  id: id
                };
                _context4.next = 5;
                return _GroupServices.default.deleteGroup(data);

              case 5:
                response = _context4.sent;
                res.status(202).send(response);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function deleteGroup(_x7, _x8) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }, {
    key: "addMembersToGroup",
    value: function () {
      var _addMembersToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var userId, id, emails, data, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userId = req.user.id;
                id = req.params.id;
                emails = req.body.emails;
                data = {
                  userId: userId,
                  id: id,
                  emails: emails
                };
                _context5.next = 6;
                return _GroupServices.default.addMembersToGroup(data);

              case 6:
                response = _context5.sent;

                if (response.status === 200) {
                  res.status(200).send(response);
                } else {
                  res.status(400).send(response);
                }

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function addMembersToGroup(_x9, _x10) {
        return _addMembersToGroup.apply(this, arguments);
      }

      return addMembersToGroup;
    }()
  }, {
    key: "removeMemberFromGroup",
    value: function () {
      var _removeMemberFromGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var userId, _req$params, groupId, memberId, data, response;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userId = req.user.id;
                _req$params = req.params, groupId = _req$params.groupId, memberId = _req$params.memberId;
                data = {
                  userId: userId,
                  memberId: memberId,
                  groupId: groupId
                };
                _context6.next = 5;
                return _GroupServices.default.removeMemberFromGroup(data);

              case 5:
                response = _context6.sent;

                if (response.status === 202) {
                  res.status(202).send(response);
                } else {
                  res.status(403).send(response);
                }

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function removeMemberFromGroup(_x11, _x12) {
        return _removeMemberFromGroup.apply(this, arguments);
      }

      return removeMemberFromGroup;
    }()
  }, {
    key: "sendGroupMessage",
    value: function () {
      var _sendGroupMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res) {
        var userId, groupId, _req$body, subject, message, status, data, response;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                userId = req.user.id;
                groupId = req.params.groupId;
                _req$body = req.body, subject = _req$body.subject, message = _req$body.message, status = _req$body.status;
                data = {
                  userId: userId,
                  groupId: groupId,
                  subject: subject,
                  message: message,
                  status: status
                };
                _context7.next = 6;
                return _GroupServices.default.sendGroupMessage(data);

              case 6:
                response = _context7.sent;

                if (response.status === 201) {
                  res.status(201).send(response);
                } else {
                  res.status(400).send(response);
                }

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function sendGroupMessage(_x13, _x14) {
        return _sendGroupMessage.apply(this, arguments);
      }

      return sendGroupMessage;
    }()
  }]);

  return UserController;
}();

exports.default = UserController;