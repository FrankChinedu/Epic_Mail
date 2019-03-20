"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

require("dotenv/config");

var _Helpers = _interopRequireDefault(require("../helpers/Helpers"));

var _index = require("../db/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "createUserTable",

    /* istanbul ignore next */
    value: function () {
      var _createUserTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /* istanbul ignore next */
                queryText = "CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL NOT NULL UNIQUE PRIMARY KEY,\n        firstname VARCHAR(128) NOT NULL,\n        lastname VARCHAR(128),\n        email VARCHAR(128) UNIQUE NOT NULL,\n        password VARCHAR(128) NOT NULL,\n        avatar VARCHAR(128),\n        createdAt TIMESTAMP,\n        updatedAt TIMESTAMP\n      )";
                _context.next = 3;
                return _index.pool.query(queryText)
                /* istanbul ignore next */
                .then(function () {})
                /* istanbul ignore next */
                .catch(function () {});

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createUserTable() {
        return _createUserTable.apply(this, arguments);
      }

      return createUserTable;
    }()
    /* istanbul ignore next */

  }, {
    key: "dropUserTable",
    value: function () {
      var _dropUserTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                /* istanbul ignore next */
                queryText = 'DROP TABLE IF EXISTS users CASCADE';
                /* istanbul ignore next */

                _context2.next = 3;
                return _index.pool.query(queryText)
                /* istanbul ignore next */
                .then(function () {})
                /* istanbul ignore next */
                .catch(function () {});

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function dropUserTable() {
        return _dropUserTable.apply(this, arguments);
      }

      return dropUserTable;
    }()
  }, {
    key: "getJsonWebToken",
    value: function getJsonWebToken(user) {
      var firstname = user.firstname,
          lastname = user.lastname,
          email = user.email;
      var data = {
        firstname: firstname,
        lastname: lastname,
        email: email
      };
      var res = {
        status: 201,
        data: _objectSpread({}, data, {
          token: _Helpers.default.jwtSignUser(user)
        })
      };
      return res;
    }
  }, {
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var firstname, lastname, password, email, hashpassword, dbQuery, values, _ref2, rows, user;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                firstname = _ref.firstname, lastname = _ref.lastname, password = _ref.password, email = _ref.email;
                hashpassword = _Helpers.default.hashPassword(password);
                dbQuery = "INSERT INTO\n      users(firstname, lastname, email, password, createdAt, updatedAt)\n      VALUES($1, $2, $3, $4, $5, $6) returning *";
                values = [firstname, lastname, email, hashpassword, (0, _moment.default)(new Date()), (0, _moment.default)(new Date())];
                _context3.prev = 4;
                _context3.next = 7;
                return (0, _index.query)(dbQuery, values);

              case 7:
                _ref2 = _context3.sent;
                rows = _ref2.rows;
                user = rows[0];
                return _context3.abrupt("return", this.getJsonWebToken(user));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](4);

                if (!(_context3.t0.routine === '_bt_check_unique')) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", {
                  status: 500,
                  error: 'account already exists'
                });

              case 17:
                return _context3.abrupt("return", {
                  status: 500,
                  error: _context3.t0
                });

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 13]]);
      }));

      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref3) {
        var email, password, dbQuery, _ref4, rows, user, isUserPassword, res;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = _ref3.email, password = _ref3.password;
                dbQuery = 'SELECT * FROM users WHERE email = $1';
                _context4.next = 4;
                return (0, _index.query)(dbQuery, [email]);

              case 4:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                user = rows[0];

                if (user) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", {
                  status: 401,
                  error: 'The credentials you provided is incorrect'
                });

              case 9:
                _context4.next = 11;
                return _Helpers.default.comparePassword(password, user.password);

              case 11:
                isUserPassword = _context4.sent;

                if (isUserPassword) {
                  _context4.next = 14;
                  break;
                }

                return _context4.abrupt("return", {
                  status: 401,
                  error: 'The credentials you provided is incorrect'
                });

              case 14:
                res = this.getJsonWebToken(user);
                res.status = 200;
                return _context4.abrupt("return", res);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function login(_x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(email) {
        var dbQuery, _ref5, rows, _rows$, id, firstname, lastname, user, token;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                dbQuery = 'SELECT * FROM users WHERE email=$1';
                _context5.next = 3;
                return (0, _index.query)(dbQuery, [email]);

              case 3:
                _ref5 = _context5.sent;
                rows = _ref5.rows;

                if (rows[0]) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", {
                  status: 404,
                  data: {
                    message: 'User not found'
                  }
                });

              case 7:
                _rows$ = rows[0], id = _rows$.id, firstname = _rows$.firstname, lastname = _rows$.lastname;
                user = {
                  id: id,
                  firstname: firstname,
                  lastname: lastname,
                  email: email
                };
                token = _Helpers.default.jwtSignUser(user);
                this.sendEmail(email, token);
                return _context5.abrupt("return", {
                  status: 200,
                  data: {
                    message: 'check your email for reset password link',
                    email: email
                  }
                });

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function reset(_x3) {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "sendEmail",
    value: function sendEmail(email, token) {
      var mailOptions = {
        from: 'EPIC MAIL',
        to: email,
        subject: 'EPIC MAIL Reset Password Link',
        html: "<h1> reset link </h1>\n         <p> click on the\n        <a href='https://frankchinedu.github.io/Epic_Mail/UI/reset-password.html?x-access-token=".concat(token, "'>link</a>\n        to reset password </p>\n      ")
      };

      var transporter = _nodemailer.default.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_ACCOUNT,
          pass: process.env.GMAIL_PASSWORD
        }
      });

      transporter.sendMail(mailOptions).then(function () {
        return {};
      }).catch(function (err) {
        throw err;
      });
      return {};
    }
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref6) {
        var userId, password, email, hashpassword, dbQuery, _ref7, rows, user, update, res;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userId = _ref6.userId, password = _ref6.password, email = _ref6.email;
                hashpassword = _Helpers.default.hashPassword(password);
                dbQuery = 'SELECT * FROM users WHERE email= $1';
                _context6.prev = 3;
                _context6.next = 6;
                return (0, _index.query)(dbQuery, [email]);

              case 6:
                _ref7 = _context6.sent;
                rows = _ref7.rows;
                user = rows[0];

                if (user) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt("return", {
                  status: 404,
                  error: 'User not found'
                });

              case 11:
                update = 'UPDATE users SET password=$1, updatedat=$2 WHERE id=$3 AND email=$4 returning *';
                _context6.next = 14;
                return (0, _index.query)(update, [hashpassword, (0, _moment.default)(new Date()), userId, email]);

              case 14:
                res = _context6.sent;

                if (res.rows[0]) {
                  _context6.next = 17;
                  break;
                }

                return _context6.abrupt("return", {
                  status: 400,
                  error: 'something went wrong try again'
                });

              case 17:
                return _context6.abrupt("return", {
                  status: 200,
                  data: 'Password changed, goto login'
                });

              case 20:
                _context6.prev = 20;
                _context6.t0 = _context6["catch"](3);
                return _context6.abrupt("return", {
                  status: 400,
                  error: _context6.t0
                });

              case 23:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[3, 20]]);
      }));

      function resetPassword(_x4) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }()
  }]);

  return User;
}();

exports.User = User;