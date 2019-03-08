"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Database = require("../dummyData/Database");

var _user = _interopRequireDefault(require("../model/user"));

var _Helpers = _interopRequireDefault(require("../helpers/Helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    key: "createUser",
    value: function createUser(_ref) {
      var firstName = _ref.firstName,
          lastName = _ref.lastName,
          password = _ref.password,
          email = _ref.email;
      var user = new _user.default();
      user.id = _Database.users[_Database.users.length - 1].id + 1;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;

      _Database.users.push(user);

      return this.getJsonWebToken(user);
    }
  }, {
    key: "login",
    value: function login(_ref2) {
      var email = _ref2.email,
          password = _ref2.password;

      var user = _Database.users.find(function (data) {
        return data.email === email;
      });

      if (!user) {
        return {
          status: 403,
          error: ['The login email information was incorrect']
        };
      }

      if (user.password !== password) {
        return {
          status: 403,
          error: ['The login information was incorrect']
        };
      }

      return this.getJsonWebToken(user);
    }
  }, {
    key: "getJsonWebToken",
    value: function getJsonWebToken(user) {
      var userJson = JSON.stringify(user);
      userJson = JSON.parse(userJson);
      var res = {
        status: 201,
        data: _objectSpread({}, user, {
          token: _Helpers.default.jwtSignUser(userJson)
        })
      };
      return res;
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers() {
      return _Database.users;
    }
  }]);

  return UserServices;
}();

exports.default = UserServices;