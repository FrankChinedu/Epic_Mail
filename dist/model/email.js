"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Email = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = require("../db/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Email =
/*#__PURE__*/
function () {
  function Email() {
    _classCallCheck(this, Email);
  }

  _createClass(Email, null, [{
    key: "createMessage",
    value: function () {
      var _createMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var subject, message, status, dbQuery, values, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                subject = _ref.subject, message = _ref.message, status = _ref.status;
                dbQuery = "INSERT INTO\n      emails(subject, message, status, createdat)\n      VALUES($1, $2, $3, $4)\n      returning *";
                values = [subject, message, status, (0, _moment.default)(new Date())];
                _context.prev = 3;
                _context.next = 6;
                return (0, _index.query)(dbQuery, values);

              case 6:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt("return", {
                  success: true,
                  data: _objectSpread({}, rows[0])
                });

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return", {
                  success: false,
                  error: _context.t0
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 11]]);
      }));

      function createMessage(_x) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
    /* istanbul ignore next */

  }, {
    key: "createEmailTable",
    value: function () {
      var _createEmailTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                /* istanbul ignore next */
                queryText = "CREATE TABLE IF NOT EXISTS\n      emails(\n        id SERIAL NOT NULL UNIQUE PRIMARY KEY,\n        subject VARCHAR(128),\n        message TEXT,\n        parentMessageId INTEGER,\n        status VARCHAR(128),\n        createdAt TIMESTAMP\n      )";
                _context2.next = 3;
                return _index.pool.query(queryText)
                /* istanbul ignore next */
                .then(function () {}).catch(function () {});

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createEmailTable() {
        return _createEmailTable.apply(this, arguments);
      }

      return createEmailTable;
    }()
    /* istanbul ignore next */

  }, {
    key: "dropEmailTable",
    value: function () {
      var _dropEmailTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                /* istanbul ignore next */
                queryText = 'DROP TABLE IF EXISTS emails CASCADE';
                /* istanbul ignore next */

                _context3.next = 3;
                return _index.pool.query(queryText)
                /* istanbul ignore next */
                .then(function () {})
                /* istanbul ignore next */
                .catch(function () {});

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function dropEmailTable() {
        return _dropEmailTable.apply(this, arguments);
      }

      return dropEmailTable;
    }()
  }, {
    key: "getMessageReceiverId",
    value: function () {
      var _getMessageReceiverId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(email) {
        var findQuery, _ref3, rows, id;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                findQuery = 'SELECT * FROM users WHERE email=$1 ';
                _context4.prev = 1;
                _context4.next = 4;
                return (0, _index.query)(findQuery, [email]);

              case 4:
                _ref3 = _context4.sent;
                rows = _ref3.rows;

                if (rows[0]) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", {
                  success: false,
                  error: 'user not found try another email'
                });

              case 8:
                id = rows[0].id;
                return _context4.abrupt("return", {
                  success: true,
                  id: id
                });

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", {
                  success: false,
                  error: _context4.t0
                });

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 12]]);
      }));

      function getMessageReceiverId(_x2) {
        return _getMessageReceiverId.apply(this, arguments);
      }

      return getMessageReceiverId;
    }()
  }, {
    key: "qry",
    value: function qry(field, table) {
      var dbQuery = "SELECT emails.id as id,  emails.subject as subject, emails.message as message, emails.parentmessageid as parentMessageId,\n    emails.status as status, ".concat(table, ".receiverid as receiverId, ").concat(table, ".senderid as senderId, ").concat(table, ".read as read, ").concat(table, ".createdat as createdOn\n    FROM ").concat(table, "\n    INNER JOIN emails ON ").concat(table, ".messageid = emails.id  WHERE ").concat(table, ".").concat(field, " = $1;\n     ");
      return dbQuery;
    }
  }, {
    key: "queryToRun",
    value: function () {
      var _queryToRun = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(userId, field, table) {
        var dbQuery, _ref4, rows, data;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                dbQuery = this.qry(field, table);
                _context5.prev = 1;
                _context5.next = 4;
                return (0, _index.query)(dbQuery, [userId]);

              case 4:
                _ref4 = _context5.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", {
                  success: true,
                  empty: true,
                  data: 'No result'
                });

              case 8:
                data = rows;
                return _context5.abrupt("return", {
                  success: true,
                  empty: false,
                  data: [data]
                });

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", {
                  success: false,
                  error: _context5.t0
                });

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 12]]);
      }));

      function queryToRun(_x3, _x4, _x5) {
        return _queryToRun.apply(this, arguments);
      }

      return queryToRun;
    }()
  }, {
    key: "getInboxMessages",
    value: function () {
      var _getInboxMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(userId) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.queryToRun(userId, 'receiverid', 'inboxs'));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getInboxMessages(_x6) {
        return _getInboxMessages.apply(this, arguments);
      }

      return getInboxMessages;
    }()
  }, {
    key: "getSentEmails",
    value: function () {
      var _getSentEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(userId) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.queryToRun(userId, 'senderid', 'sents'));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getSentEmails(_x7) {
        return _getSentEmails.apply(this, arguments);
      }

      return getSentEmails;
    }()
  }, {
    key: "deleteInboxMessage",
    value: function () {
      var _deleteInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(_ref5) {
        var userId, id, dbQuery, _ref6, rows;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                userId = _ref5.userId, id = _ref5.id;
                dbQuery = 'DELETE FROM inboxs WHERE id=$1 AND receiverid=$2 returning *';
                _context8.prev = 2;
                _context8.next = 5;
                return (0, _index.query)(dbQuery, [id, userId]);

              case 5:
                _ref6 = _context8.sent;
                rows = _ref6.rows;

                if (rows[0]) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return", {
                  success: true,
                  data: 'no result'
                });

              case 9:
                return _context8.abrupt("return", {
                  success: true,
                  data: 'deleted successfully'
                });

              case 12:
                _context8.prev = 12;
                _context8.t0 = _context8["catch"](2);
                return _context8.abrupt("return", {
                  success: false,
                  error: _context8.t0
                });

              case 15:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[2, 12]]);
      }));

      function deleteInboxMessage(_x8) {
        return _deleteInboxMessage.apply(this, arguments);
      }

      return deleteInboxMessage;
    }()
  }, {
    key: "messageExists",
    value: function () {
      var _messageExists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(userId, messageId, table, field) {
        var dbQuery, _ref7, rows;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                dbQuery = "SELECT * FROM ".concat(table, " WHERE ").concat(field, "=$1 AND messageid=$2");
                _context9.prev = 1;
                _context9.next = 4;
                return (0, _index.query)(dbQuery, [userId, messageId]);

              case 4:
                _ref7 = _context9.sent;
                rows = _ref7.rows;

                if (rows[0]) {
                  _context9.next = 8;
                  break;
                }

                return _context9.abrupt("return", {
                  success: false,
                  data: 'no found'
                });

              case 8:
                return _context9.abrupt("return", {
                  success: true,
                  data: rows[0]
                });

              case 11:
                _context9.prev = 11;
                _context9.t0 = _context9["catch"](1);
                return _context9.abrupt("return", {
                  success: false,
                  data: _context9.t0
                });

              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[1, 11]]);
      }));

      function messageExists(_x9, _x10, _x11, _x12) {
        return _messageExists.apply(this, arguments);
      }

      return messageExists;
    }()
  }, {
    key: "readMessage",
    value: function () {
      var _readMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(userId, messageId, table, field) {
        var dbQuery, _ref8, rows;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                dbQuery = "UPDATE ".concat(table, " SET read=$1, updatedat=$2 WHERE messageid=$3 AND ").concat(field, "=$4 returning *");
                _context10.next = 3;
                return (0, _index.query)(dbQuery, ['true', (0, _moment.default)(new Date()), messageId, userId]);

              case 3:
                _ref8 = _context10.sent;
                rows = _ref8.rows;
                return _context10.abrupt("return", rows[0]);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function readMessage(_x13, _x14, _x15, _x16) {
        return _readMessage.apply(this, arguments);
      }

      return readMessage;
    }()
  }, {
    key: "getAnInboxMessage",
    value: function () {
      var _getAnInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(_ref9) {
        var userId, messageId, exists, msg;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                userId = _ref9.userId, messageId = _ref9.messageId;
                _context11.next = 3;
                return this.messageExists(userId, messageId, 'inboxs', 'receiverid');

              case 3:
                exists = _context11.sent;

                if (!exists.success) {
                  _context11.next = 9;
                  break;
                }

                _context11.next = 7;
                return this.readMessage(userId, messageId, 'inboxs', 'receiverid');

              case 7:
                msg = _context11.sent;
                return _context11.abrupt("return", {
                  success: true,
                  data: msg
                });

              case 9:
                return _context11.abrupt("return", {
                  success: exists.success,
                  data: exists.data
                });

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getAnInboxMessage(_x17) {
        return _getAnInboxMessage.apply(this, arguments);
      }

      return getAnInboxMessage;
    }()
  }]);

  return Email;
}();

exports.Email = Email;