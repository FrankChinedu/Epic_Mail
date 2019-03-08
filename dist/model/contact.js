"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contacts = function Contacts() {
  _classCallCheck(this, Contacts);

  this.id = null;
  this.firstName = null;
  this.lastName = null;
  this.email = null;
  this.contactOwner = null;
  this.createdAt = new Date();
};

exports.default = Contacts;