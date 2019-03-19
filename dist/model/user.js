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
      var res = {
        status: 201,
        data: {
          // ...user,
          token: _Helpers.default.jwtSignUser(user)
        }
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
                  status: 401,
                  error: 'account already exists'
                });

              case 17:
                return _context3.abrupt("return", {
                  status: 401,
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
                  success: true
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
                return _context5.abrupt("return", true);

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
        // to: email,
        to: 'frankieetchy@gmail.com',
        subject: 'Reset Password Link',
        html: "<h1> reset link </h1>\n         <p> click on the\n        <a href='https://frankchinedu.github.io/Epic_Mail/UI/reset-password.html?x-access-token=".concat(token, "'>link</a>\n        to reset password </p>\n      ")
      };

      var transporter = _nodemailer.default.createTransport({
        service: 'gmail',
        auth: {
          user: 'testcodedev1@gmail.com',
          pass: 'OBIchinedu123'
        }
      });

      transporter.sendMail(mailOptions).then(function (res) {
        console.log(res);
        return {};
      }).catch(function (err) {
        console.log(err);
        return {};
      });
      return {};
    }
  }]);

  return User;
}();

exports.User = User;