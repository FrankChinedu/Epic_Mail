"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drafts = function Drafts() {
  _classCallCheck(this, Drafts);

  this.id = null;
  this.senderId = null;
  this.messageId = null;
  this.receiverId = null;
  this.createdOn = new Date();
};

exports.default = Drafts;