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
        lastname: Joi.any(),
        email: Joi.string().email({
          minDomainAtoms: 2
        }).required(),
        password: Joi.string().min(8)
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

          case 'password':
            res.status(401).send({
              status: 401,
              error: 'password was must be at least 8'
            });
            break;

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
        res.status(401).send({
          status: 401,
          data: error.details[0].message
        });
      } else {
        next();
      }
    }
  }, {
    key: "verifyToken",
    value: function () {
      var _verifyToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, decoded, text, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers['x-access-token'];

                if (token) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(401).send({
                  status: 401,
                  data: 'Token is not provided'
                }));

              case 3:
                _context.prev = 3;
                _context.next = 6;
                return _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

              case 6:
                decoded = _context.sent;
                text = 'SELECT * FROM users WHERE id = $1';
                _context.next = 10;
                return (0, _index.query)(text, [decoded.id]);

              case 10:
                _ref = _context.sent;
                rows = _ref.rows;

                if (rows[0]) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", res.status(401).send({
                  status: 401,
                  data: 'The token you provided is invalid'
                }));

              case 14:
                req.user = {
                  id: decoded.id,
                  email: decoded.email
                };
                next();
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return", res.status(401).send({
                  status: 401,
                  data: _context.t0
                }));

              case 21:
                return _context.abrupt("return", {});

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 18]]);
      }));

      function verifyToken(_x, _x2, _x3) {
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
        return res.status(400).send({
          status: 400,
          data: 'You cannot send an email to your self'
        });
      }

      next();
      return {};
    }
  }]);

  return Auth;
}();

exports.default = Auth;