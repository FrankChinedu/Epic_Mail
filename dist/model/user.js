"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = function Users() {
  _classCallCheck(this, Users);

  this.id = null;
  this.firstName = null;
  this.lastName = null;
  this.email = null;
  this.password = null;
  this.createdAt = new Date();
  this.updateAt = new Date();
};

exports.default = Users;