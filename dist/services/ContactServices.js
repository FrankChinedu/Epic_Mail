"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = require("../model/contact");

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
    key: "addContact",
    value: function () {
      var _addContact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(data) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _contact.Contact.addContact(data);

              case 2:
                res = _context.sent;

                if (!res.success) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", {
                  status: 201,
                  data: res.data
                });

              case 5:
                return _context.abrupt("return", {
                  status: 400,
                  data: res.data
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addContact(_x) {
        return _addContact.apply(this, arguments);
      }

      return addContact;
    }()
  }, {
    key: "getAllUserContacts",
    value: function () {
      var _getAllUserContacts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(userId) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _contact.Contact.getAllUserContacts(userId);

              case 2:
                res = _context2.sent;

                if (!res.success) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", {
                  status: 200,
                  data: res.data
                });

              case 5:
                return _context2.abrupt("return", {
                  status: 400,
                  data: res.data
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllUserContacts(_x2) {
        return _getAllUserContacts.apply(this, arguments);
      }

      return getAllUserContacts;
    }()
  }, {
    key: "deleteContact",
    value: function () {
      var _deleteContact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(data) {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _contact.Contact.deleteContact(data);

              case 2:
                res = _context3.sent;

                if (!res.success) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", {
                  status: 202,
                  data: res.data
                });

              case 5:
                return _context3.abrupt("return", {
                  status: 404,
                  data: res.data
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function deleteContact(_x3) {
        return _deleteContact.apply(this, arguments);
      }

      return deleteContact;
    }()
  }]);

  return UserServices;
}();

exports.default = UserServices;