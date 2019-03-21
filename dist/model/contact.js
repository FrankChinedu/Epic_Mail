"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = void 0;

var _index = require("../db/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Contact =
/*#__PURE__*/
function () {
  function Contact() {
    _classCallCheck(this, Contact);
  }

  _createClass(Contact, null, [{
    key: "createContactsTable",

    /* istanbul ignore next */
    value: function () {
      var _createContactsTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /* istanbul ignore next */
                queryText = "CREATE TABLE IF NOT EXISTS\n      contacts(\n        id SERIAL NOT NULL UNIQUE PRIMARY KEY,\n        firstname VARCHAR(128) NOT NULL,\n        lastname VARCHAR(128),\n        email VARCHAR(128) NOT NULL,\n        contact_Owner_Id INTEGER,\n        avatar VARCHAR(128),\n        createdAt TIMESTAMP DEFAULT NOW(),\n        updatedAt TIMESTAMP DEFAULT NOW(),\n        FOREIGN KEY (contact_Owner_Id) REFERENCES users (id) ON DELETE CASCADE\n      )";
                _context.next = 3;
                return _index.pool.query(queryText)
                /* istanbul ignore next */
                .then(function () {})
                /* istanbul ignore next */
                .catch(function () {});

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createContactsTable() {
        return _createContactsTable.apply(this, arguments);
      }

      return createContactsTable;
    }()
    /* istanbul ignore next */

  }, {
    key: "dropContactTable",
    value: function () {
      var _dropContactTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                /* istanbul ignore next */
                queryText = 'DROP TABLE IF EXISTS contacts CASCADE';
                /* istanbul ignore next */

                _context2.next = 3;
                return _index.pool.query(queryText)
                /* istanbul ignore next */
                .then(function () {})
                /* istanbul ignore next */
                .catch(function () {});

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function dropContactTable() {
        return _dropContactTable.apply(this, arguments);
      }

      return dropContactTable;
    }()
  }, {
    key: "addContact",
    value: function () {
      var _addContact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var userId, email, dbQuery, _ref2, rows, id, contact, userExist, add, val, resp;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = _ref.userId, email = _ref.email;
                dbQuery = 'SELECT * FROM users WHERE email=$1';
                _context3.next = 4;
                return (0, _index.query)(dbQuery, [email]);

              case 4:
                _ref2 = _context3.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", {
                  success: false,
                  data: 'Contact does not exist'
                });

              case 8:
                id = rows[0].id;

                if (!(parseInt(id, 0) === parseInt(userId, 0))) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return", {
                  success: false,
                  data: 'You cannot add your self as a contact'
                });

              case 11:
                contact = "SELECT * FROM contacts WHERE contact_owner_id=$1\n    AND email=$2";
                _context3.next = 14;
                return (0, _index.query)(contact, [userId, email]);

              case 14:
                userExist = _context3.sent;

                if (!userExist.rows[0]) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", {
                  success: false,
                  data: 'This user is already a contact'
                });

              case 17:
                add = "INSERT INTO\n      contacts(firstname, lastname, email, contact_owner_id, \n        avatar)\n      VALUES($1, $2, $3, $4, $5)\n      returning *";
                val = [rows[0].firstname, rows[0].lastname, rows[0].email, userId, rows[0].avatar];
                _context3.next = 21;
                return (0, _index.query)(add, val);

              case 21:
                resp = _context3.sent;
                return _context3.abrupt("return", {
                  success: true,
                  data: resp.rows[0]
                });

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function addContact(_x) {
        return _addContact.apply(this, arguments);
      }

      return addContact;
    }()
  }, {
    key: "getAllUserContacts",
    value: function () {
      var _getAllUserContacts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(userId) {
        var dbQuery, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dbQuery = ' SELECT * FROM contacts WHERE contact_owner_id=$1';
                _context4.next = 3;
                return (0, _index.query)(dbQuery, [userId]);

              case 3:
                _ref3 = _context4.sent;
                rows = _ref3.rows;

                if (rows[0]) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", {
                  success: false,
                  data: 'no found'
                });

              case 7:
                return _context4.abrupt("return", {
                  success: true,
                  data: rows
                });

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getAllUserContacts(_x2) {
        return _getAllUserContacts.apply(this, arguments);
      }

      return getAllUserContacts;
    }()
  }, {
    key: "deleteContact",
    value: function () {
      var _deleteContact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref4) {
        var userId, id, dbQuery, _ref5, rows;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userId = _ref4.userId, id = _ref4.id;
                dbQuery = 'DELETE FROM contacts WHERE id=$1 AND contact_owner_id=$2 returning *';
                _context5.prev = 2;
                _context5.next = 5;
                return (0, _index.query)(dbQuery, [id, userId]);

              case 5:
                _ref5 = _context5.sent;
                rows = _ref5.rows;

                if (rows[0]) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", {
                  success: false,
                  data: 'no result'
                });

              case 9:
                return _context5.abrupt("return", {
                  success: true,
                  data: 'deleted successfully'
                });

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", {
                  success: false,
                  error: _context5.t0
                });

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 12]]);
      }));

      function deleteContact(_x3) {
        return _deleteContact.apply(this, arguments);
      }

      return deleteContact;
    }()
  }]);

  return Contact;
}();

exports.Contact = Contact;