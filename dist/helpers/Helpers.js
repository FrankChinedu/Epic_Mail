"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _Database = require("../dummyData/Database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Helpers =
/*#__PURE__*/
function () {
  function Helpers() {
    _classCallCheck(this, Helpers);
  }

  _createClass(Helpers, null, [{
    key: "emailExist",
    value: function emailExist(array, email) {
      var result = false;
      array.forEach(function (data) {
        if (data === email) {
          result = true;
        }
      });
      return result;
    }
  }, {
    key: "AllEmails",
    value: function AllEmails() {
      var AllEmails = [];

      _Database.users.forEach(function (data) {
        AllEmails.push(data.email);
      });

      return AllEmails;
    }
  }, {
    key: "jwtSignUser",
    value: function jwtSignUser(user) {
      var ONE_WEEK = 60 * 60 * 24 * 7;
      return _jsonwebtoken.default.sign(user, process.env.JWT_SECRET, {
        expiresIn: ONE_WEEK
      });
    }
  }, {
    key: "comparePassword",
    value: function () {
      var _comparePassword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(password, userHashpassword) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _bcrypt.default.compare(password, userHashpassword);

              case 2:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function comparePassword(_x, _x2) {
        return _comparePassword.apply(this, arguments);
      }

      return comparePassword;
    }()
  }]);

  return Helpers;
}();

exports.default = Helpers;