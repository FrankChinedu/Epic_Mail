"use strict";

var _user = _interopRequireDefault(require("./user"));

var _message = _interopRequireDefault(require("./message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  userRoute: _user.default,
  messageRoute: _message.default
};