"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Inboxs = function Inboxs() {
  _classCallCheck(this, Inboxs);

  this.id = null;
  this.receiverId = null;
  this.senderId = null;
  this.messageId = null;
  this.read = false;
  this.createdOn = new Date();
};

exports.default = Inboxs;