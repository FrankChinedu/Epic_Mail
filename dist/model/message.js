"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Emails = function Emails() {
  _classCallCheck(this, Emails);

  this.id = null;
  this.subject = null;
  this.message = null;
  this.parentMessageId = null;
  this.status = null; // sent, draft

  this.createdOn = new Date();
};

exports.default = Emails;