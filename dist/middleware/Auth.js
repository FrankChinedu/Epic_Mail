"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = require("../db/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Joi = require('joi');

var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: "validate",
    value: function validate(req, res, next) {
      var schema = {
        firstname: Joi.string().required().min(2).regex(/^[a-zA-Z]+/),
        lastname: Joi.string().required().min(2).regex(/^[a-zA-Z]+/),
        email: Joi.string().email({
          minDomainAtoms: 2
        }).required(),
        password: Joi.string().min(8).required()
      };

      var _Joi$validate = Joi.validate(req.body, schema),
          error = _Joi$validate.error;

      if (error) {
        switch (error.details[0].context.key) {
          case 'email':
            res.status(401).send({
              status: 401,
              error: 'you must provide a valid email address'
            });
            break;

          case 'firstname':
            res.status(401).send({
              status: 401,
              error: 'firstname cannot be empty or less than two characters and must not start with a number'
            });
            break;

          case 'lastname':
            /* istanbul ignore next */
            res.status(401).send({
              status: 401,
              error: 'lastname cannot be empty or less than two characters and must not start with a number'
            });
            /* istanbul ignore next */

            break;

          case 'password':
            res.status(401).send({
              status: 401,
              error: 'password cannot be empty and must be at least 8'
            });
            break;

          /* istanbul ignore next */

          default:
            res.status(401).send({
              status: 401,
              error: 'invalid registration information'
            });
        }
      } else {
        next();
      }
    }
  }, {
    key: "trimmer",
    value: function trimmer(req, res, next) {
      var body = req.body;

      if (body) {
        var trimmed = {};
        Object.keys(body).forEach(function (key) {
          var value = body[key];
          Object.assign(trimmed, _defineProperty({}, key, value.trim()));
        });
        req.body = trimmed;
      }

      next();
    }
  }, {
    key: "magicValidator",
    value: function magicValidator(req, res, next) {
      var body = req.body;
      var toValidate = {};
      var obj = {};
      Object.keys(body).forEach(function (key) {
        obj = Object.assign(toValidate, _defineProperty({}, key, Joi.string().required()));
      });
      var schema = obj;

      var _Joi$validate2 = Joi.validate(body, schema),
          error = _Joi$validate2.error;

      if (error) {
        /* istanbul ignore next */
        res.status(400).send({
          status: 400,
          error: error.details[0].message
        });
      } else {
        next();
      }
    }
  }, {
    key: "verifyLogin",
    value: function () {
      var _verifyLogin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var schema, _Joi$validate3, error;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                schema = {
                  email: Joi.string().email({
                    minDomainAtoms: 2
                  }).required(),
                  password: Joi.string().min(8).required()
                };
                _Joi$validate3 = Joi.validate(req.body, schema), error = _Joi$validate3.error;

                if (!error) {
                  _context.next = 13;
                  break;
                }

                _context.t0 = error.details[0].context.key;
                _context.next = _context.t0 === 'email' ? 6 : _context.t0 === 'password' ? 8 : 10;
                break;

              case 6:
                res.status(401).send({
                  status: 401,
                  error: 'you must provide a valid email address'
                });
                return _context.abrupt("break", 11);

              case 8:
                res.status(401).send({
                  status: 401,
                  error: 'password cannot be empty and must be at least 8'
                });
                return _context.abrupt("break", 11);

              case 10:
                res.status(401).send({
                  status: 401,
                  error: 'invalid registration information'
                });

              case 11:
                _context.next = 14;
                break;

              case 13:
                next();

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function verifyLogin(_x, _x2, _x3) {
        return _verifyLogin.apply(this, arguments);
      }

      return verifyLogin;
    }()
  }, {
    key: "verifyToken",
    value: function () {
      var _verifyToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var token, decoded, text, _ref, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.headers['x-access-token'];

                if (token) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", res.status(401).send({
                  status: 401,
                  error: 'Token is not provided'
                }));

              case 3:
                _context2.prev = 3;
                _context2.next = 6;
                return _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

              case 6:
                decoded = _context2.sent;
                text = 'SELECT * FROM users WHERE id = $1';
                _context2.next = 10;
                return (0, _index.query)(text, [decoded.id]);

              case 10:
                _ref = _context2.sent;
                rows = _ref.rows;

                if (rows[0]) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return", res.status(401).send({
                  status: 401,
                  error: 'The token you provided is invalid'
                }));

              case 14:
                req.user = {
                  id: decoded.id,
                  email: decoded.email
                };
                next();
                _context2.next = 21;
                break;

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](3);
                return _context2.abrupt("return", res.status(500).send({
                  status: 500,
                  error: _context2.t0
                }));

              case 21:
                return _context2.abrupt("return", {});

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 18]]);
      }));

      function verifyToken(_x4, _x5, _x6) {
        return _verifyToken.apply(this, arguments);
      }

      return verifyToken;
    }()
  }, {
    key: "spoof",
    value: function spoof(req, res, next) {
      var email = req.user.email;
      var recieversEmail = req.body.recieversEmail;

      if (email === recieversEmail) {
        /* istanbul ignore next */
        return res.status(400).send({
          status: 400,
          error: 'You cannot send an email to your self'
        });
      }

      next();
      return {};
    }
  }]);

  return Auth;
}();

exports.default = Auth;