"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Helpers = _interopRequireDefault(require("../helpers/Helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        firstName: Joi.string().required(),
        lastName: Joi.any(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/)
      };

      var _Joi$validate = Joi.validate(req.body, schema),
          error = _Joi$validate.error;

      if (error) {
        switch (error.details[0].context.key) {
          case 'email':
            res.status(403).send({
              error: ['you must provide a valid email address']
            });
            break;

          case 'firstName':
            res.status(403).send({
              error: ['firstName cannot be empty']
            });
            break;

          case 'password':
            res.status(403).send({
              error: ['the password must match the following rules', 'it must contain only numbers or letters or both', 'it must be at least 8 charcters in length and not greater than 32']
            });
            break;

          default:
            res.status(403).send({
              error: ['invalid registration information']
            });
        }
      } else {
        next();
      }
    }
  }, {
    key: "emailExist",
    value: function emailExist(req, res, next) {
      var email = req.body.email;

      var emailExist = _Helpers.default.emailExist(_Helpers.default.AllEmails(), email);

      if (emailExist) {
        res.status(403).send({
          error: ['User already exists']
        });
      } else {
        next();
      }
    }
  }]);

  return Auth;
}();

exports.default = Auth;