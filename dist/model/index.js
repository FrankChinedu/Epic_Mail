"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropAllTables = exports.createAllTables = void 0;

var _user = require("./user");

var _email = require("./email");

var _contact = require("./contact");

var _inbox = require("./inbox");

var _sent = require("./sent");

var _draft = require("./draft");

var _group = require("./group");

var _groupMembers = require("./groupMembers");

var _index = require("../db/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* istanbul ignore next */
var createAllTables =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user.User.createUserTable();

          case 2:
            _context.next = 4;
            return _email.Email.createEmailTable();

          case 4:
            _context.next = 6;
            return _contact.Contact.createContactsTable();

          case 6:
            _context.next = 8;
            return _inbox.Inbox.createInboxTable();

          case 8:
            _context.next = 10;
            return _sent.Sent.createSentTable();

          case 10:
            _context.next = 12;
            return _draft.Draft.createDraftTable();

          case 12:
            _context.next = 14;
            return _group.Group.createGroupTable();

          case 14:
            _context.next = 16;
            return _groupMembers.GroupMember.createMemberTable();

          case 16:
            _index.pool.end();

            if (process.env.NODE_ENV === 'test') {
              process.exit(0);
            }

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createAllTables() {
    return _ref.apply(this, arguments);
  };
}();
/* istanbul ignore next */


exports.createAllTables = createAllTables;

var dropAllTables =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user.User.dropUserTable();

          case 2:
            _context2.next = 4;
            return _email.Email.dropEmailTable();

          case 4:
            _context2.next = 6;
            return _contact.Contact.dropContactTable();

          case 6:
            _context2.next = 8;
            return _inbox.Inbox.dropInboxTable();

          case 8:
            _context2.next = 10;
            return _sent.Sent.dropSentTable();

          case 10:
            _context2.next = 12;
            return _draft.Draft.dropDraftTable();

          case 12:
            _context2.next = 14;
            return _group.Group.dropGroupTable();

          case 14:
            _context2.next = 16;
            return _groupMembers.GroupMember.dropMemberTable();

          case 16:
            _index.pool.end();

            if (process.env.NODE_ENV === 'test') {
              process.exit(0);
            }

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function dropAllTables() {
    return _ref2.apply(this, arguments);
  };
}();

exports.dropAllTables = dropAllTables;

require('make-runnable');