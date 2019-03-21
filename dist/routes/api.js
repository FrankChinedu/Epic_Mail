"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("./user"));

var _message = _interopRequireDefault(require("./message"));

var _contact = _interopRequireDefault(require("./contact"));

var _group = _interopRequireDefault(require("./group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  userRoute: _user.default,
  messageRoute: _message.default,
  groupRoute: _group.default,
  contactRoute: _contact.default
};
exports.default = _default;