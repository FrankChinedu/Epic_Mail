"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

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
    key: "hashPassword",
    value: function hashPassword(password) {
      return _bcrypt.default.hashSync(password, _bcrypt.default.genSaltSync(8));
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
    }() // copied from https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404

  }, {
    key: "asyncForEach",
    value: function () {
      var _asyncForEach = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(array, callback) {
        var index;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                index = 0;

              case 1:
                if (!(index < array.length)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return callback(array[index], index, array);

              case 4:
                index++;
                _context2.next = 1;
                break;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function asyncForEach(_x3, _x4) {
        return _asyncForEach.apply(this, arguments);
      }

      return asyncForEach;
    }()
  }]);

  return Helpers;
}();

exports.default = Helpers;