"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Email = void 0;

var _index = require("../db/index");

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
                dbQuery = "INSERT INTO\n      emails(subject, message, status)\n      VALUES($1, $2, $3)\n      returning *";
                values = [subject, message, status];
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
                queryText = "CREATE TABLE IF NOT EXISTS\n      emails(\n        id SERIAL NOT NULL UNIQUE PRIMARY KEY,\n        subject VARCHAR(128),\n        message TEXT,\n        parentMessageId INTEGER,\n        status VARCHAR(128),\n        createdAt TIMESTAMP DEFAULT NOW()\n      )";
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
    key: "saveDraft",
    value: function () {
      var _saveDraft = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref3) {
        var subject, message, status, recieversEmail, userId, getReceiver, res, receiverId, dbQuery, values, result, msg, messageId, draftQuery, draftValues, info;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                subject = _ref3.subject, message = _ref3.message, status = _ref3.status, recieversEmail = _ref3.recieversEmail, userId = _ref3.userId;
                _context4.prev = 1;
                _context4.next = 4;
                return (0, _index.query)('BEGIN');

              case 4:
                getReceiver = 'SELECT * FROM users WHERE email=$1';
                _context4.next = 7;
                return (0, _index.query)(getReceiver, [recieversEmail]);

              case 7:
                res = _context4.sent;
                receiverId = null;

                if (res.rows[0]) {
                  receiverId = res.rows[0].id;
                }

                dbQuery = "INSERT INTO\n      emails(subject, message, status)\n      VALUES($1, $2, $3)\n      returning *";
                values = [subject, message, status];
                _context4.next = 14;
                return (0, _index.query)(dbQuery, values);

              case 14:
                result = _context4.sent;
                msg = result.rows[0];
                messageId = msg.id;
                draftQuery = "INSERT INTO\n    drafts(senderid, receiverid, messageid) \n    VALUES ($1, $2, $3) RETURNING *\n    ";
                draftValues = [userId, receiverId, messageId];
                _context4.next = 21;
                return (0, _index.query)(draftQuery, draftValues);

              case 21:
                info = {
                  id: messageId,
                  createdOn: msg.createdat,
                  subject: msg.subject,
                  message: msg.message,
                  parentMessageId: msg.parentmessageid,
                  status: msg.status
                };
                _context4.next = 24;
                return (0, _index.query)('COMMIT');

              case 24:
                return _context4.abrupt("return", {
                  status: 201,
                  message: 'draft saved successfully',
                  data: info
                });

              case 27:
                _context4.prev = 27;
                _context4.t0 = _context4["catch"](1);
                _context4.next = 31;
                return (0, _index.query)('ROLLBACK');

              case 31:
                return _context4.abrupt("return", {
                  statuc: 500,
                  error: 'something went wrong'
                });

              case 32:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 27]]);
      }));

      function saveDraft(_x2) {
        return _saveDraft.apply(this, arguments);
      }

      return saveDraft;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref4) {
        var subject, message, status, recieversEmail, userId, getReceiver, res, receiverId, dbQuery, values, result, msg, messageId, inboxQuery, inboxValue, sentQuery, sentValue, info;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                subject = _ref4.subject, message = _ref4.message, status = _ref4.status, recieversEmail = _ref4.recieversEmail, userId = _ref4.userId;
                getReceiver = 'SELECT * FROM users WHERE email=$1';
                _context5.next = 4;
                return (0, _index.query)(getReceiver, [recieversEmail]);

              case 4:
                res = _context5.sent;

                if (!(res.rows[0] === undefined)) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", {
                  status: 404,
                  error: 'Not found'
                });

              case 7:
                receiverId = res.rows[0].id;
                _context5.prev = 8;
                _context5.next = 11;
                return (0, _index.query)('BEGIN');

              case 11:
                dbQuery = "INSERT INTO\n      emails(subject, message, status)\n      VALUES($1, $2, $3)\n      returning *";
                values = [subject, message, status];
                _context5.next = 15;
                return (0, _index.query)(dbQuery, values);

              case 15:
                result = _context5.sent;
                msg = result.rows[0];
                messageId = msg.id;
                inboxQuery = "INSERT INTO\n    inboxs(senderid, receiverid, messageid, read) \n    VALUES ($1, $2, $3, $4) RETURNING *\n    ";
                inboxValue = [userId, receiverId, messageId, false];
                _context5.next = 22;
                return (0, _index.query)(inboxQuery, inboxValue);

              case 22:
                sentQuery = "INSERT INTO\n    sents(senderid, receiverid, messageid, read) \n    VALUES ($1, $2, $3, $4) RETURNING *\n    ";
                sentValue = [userId, receiverId, messageId, false];
                _context5.next = 26;
                return (0, _index.query)(sentQuery, sentValue);

              case 26:
                info = {
                  id: messageId,
                  createdOn: msg.createdat,
                  subject: msg.subject,
                  message: msg.message,
                  parentMessageId: msg.parentmessageid,
                  status: msg.status
                };
                _context5.next = 29;
                return (0, _index.query)('COMMIT');

              case 29:
                return _context5.abrupt("return", {
                  status: 201,
                  message: 'message sent successfully',
                  data: info
                });

              case 32:
                _context5.prev = 32;
                _context5.t0 = _context5["catch"](8);
                _context5.next = 36;
                return (0, _index.query)('ROLLBACK');

              case 36:
                return _context5.abrupt("return", {
                  status: 500,
                  error: 'something went wrong'
                });

              case 37:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[8, 32]]);
      }));

      function sendMessage(_x3) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }, {
    key: "getMessageReceiverId",
    value: function () {
      var _getMessageReceiverId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(email) {
        var findQuery, _ref5, rows, id;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                findQuery = 'SELECT * FROM users WHERE email=$1 ';
                _context6.prev = 1;
                _context6.next = 4;
                return (0, _index.query)(findQuery, [email]);

              case 4:
                _ref5 = _context6.sent;
                rows = _ref5.rows;

                if (rows[0]) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", {
                  success: false,
                  error: 'user not found try another email'
                });

              case 8:
                id = rows[0].id;
                return _context6.abrupt("return", {
                  success: true,
                  id: id
                });

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](1);
                return _context6.abrupt("return", {
                  success: false,
                  error: _context6.t0
                });

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 12]]);
      }));

      function getMessageReceiverId(_x4) {
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
      regeneratorRuntime.mark(function _callee7(userId, field, table) {
        var dbQuery, _ref6, rows, data;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                dbQuery = this.qry(field, table);
                _context7.prev = 1;
                _context7.next = 4;
                return (0, _index.query)(dbQuery, [userId]);

              case 4:
                _ref6 = _context7.sent;
                rows = _ref6.rows;

                if (rows[0]) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", {
                  success: true,
                  empty: true,
                  data: []
                });

              case 8:
                data = rows;
                return _context7.abrupt("return", {
                  success: true,
                  empty: false,
                  data: data
                });

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](1);
                return _context7.abrupt("return", {
                  success: false,
                  error: _context7.t0
                });

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 12]]);
      }));

      function queryToRun(_x5, _x6, _x7) {
        return _queryToRun.apply(this, arguments);
      }

      return queryToRun;
    }()
  }, {
    key: "getInboxMessages",
    value: function () {
      var _getInboxMessages = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(userId) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this.queryToRun(userId, 'receiverid', 'inboxs'));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getInboxMessages(_x8) {
        return _getInboxMessages.apply(this, arguments);
      }

      return getInboxMessages;
    }()
  }, {
    key: "getSentEmails",
    value: function () {
      var _getSentEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(userId) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this.queryToRun(userId, 'senderid', 'sents'));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getSentEmails(_x9) {
        return _getSentEmails.apply(this, arguments);
      }

      return getSentEmails;
    }()
  }, {
    key: "getUnReadEmails",
    value: function () {
      var _getUnReadEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(userId) {
        var dbQuery, _ref7, rows;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                dbQuery = "SELECT emails.id as id,  emails.subject as subject, emails.message as message, emails.parentmessageid as parentMessageId,\n    emails.status as status, inboxs.receiverid as receiverId, inboxs.senderid as senderId, inboxs.read as read, inboxs.createdat as createdOn\n    FROM inboxs\n    INNER JOIN emails ON inboxs.messageid = emails.id  WHERE inboxs.receiverid = $1 AND inboxs.read =$2;\n     ";
                _context10.prev = 1;
                _context10.next = 4;
                return (0, _index.query)(dbQuery, [userId, false]);

              case 4:
                _ref7 = _context10.sent;
                rows = _ref7.rows;
                return _context10.abrupt("return", {
                  status: 200,
                  data: rows
                });

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10["catch"](1);
                return _context10.abrupt("return", {
                  status: 500,
                  error: 'something went wrong'
                });

              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[1, 9]]);
      }));

      function getUnReadEmails(_x10) {
        return _getUnReadEmails.apply(this, arguments);
      }

      return getUnReadEmails;
    }()
  }, {
    key: "deleteInboxMessage",
    value: function () {
      var _deleteInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(_ref8) {
        var userId, id, dbQuery, _ref9, rows;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                userId = _ref8.userId, id = _ref8.id;
                dbQuery = 'DELETE FROM inboxs WHERE messageid=$1 AND receiverid=$2 returning *';
                _context11.prev = 2;
                _context11.next = 5;
                return (0, _index.query)(dbQuery, [id, userId]);

              case 5:
                _ref9 = _context11.sent;
                rows = _ref9.rows;

                if (rows[0]) {
                  _context11.next = 9;
                  break;
                }

                return _context11.abrupt("return", {
                  status: 404,
                  data: 'no result'
                });

              case 9:
                return _context11.abrupt("return", {
                  status: 202,
                  data: 'deleted successfully'
                });

              case 12:
                _context11.prev = 12;
                _context11.t0 = _context11["catch"](2);
                return _context11.abrupt("return", {
                  status: 500,
                  error: 'something went wrong'
                });

              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[2, 12]]);
      }));

      function deleteInboxMessage(_x11) {
        return _deleteInboxMessage.apply(this, arguments);
      }

      return deleteInboxMessage;
    }()
  }, {
    key: "messageExists",
    value: function () {
      var _messageExists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(userId, messageId, table, field) {
        var dbQuery, _ref10, rows;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                dbQuery = "SELECT * FROM ".concat(table, " WHERE ").concat(field, "=$1 AND messageid=$2");
                _context12.prev = 1;
                _context12.next = 4;
                return (0, _index.query)(dbQuery, [userId, messageId]);

              case 4:
                _ref10 = _context12.sent;
                rows = _ref10.rows;

                if (rows[0]) {
                  _context12.next = 8;
                  break;
                }

                return _context12.abrupt("return", {
                  success: false,
                  data: 'no found'
                });

              case 8:
                return _context12.abrupt("return", {
                  success: true,
                  data: rows[0]
                });

              case 11:
                _context12.prev = 11;
                _context12.t0 = _context12["catch"](1);
                return _context12.abrupt("return", {
                  success: false,
                  data: _context12.t0
                });

              case 14:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[1, 11]]);
      }));

      function messageExists(_x12, _x13, _x14, _x15) {
        return _messageExists.apply(this, arguments);
      }

      return messageExists;
    }()
  }, {
    key: "getOneMessage",
    value: function () {
      var _getOneMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(table, field, userId, messageId) {
        var getQuery, _ref11, rows;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                getQuery = "SELECT emails.id as id,  emails.subject as subject,\n    emails.message as message, emails.parentmessageid as parentMessageId,\n    emails.status as status, ".concat(table, ".receiverid as receiverId, \n    ").concat(table, ".senderid as senderId, ").concat(table, ".read as read, ").concat(table, ".createdat as createdOn\n    FROM ").concat(table, "\n    INNER JOIN emails ON ").concat(table, ".messageid = emails.id  WHERE ").concat(table, ".").concat(field, " = $1 AND ").concat(table, ".messageid =$2");
                _context13.prev = 1;
                _context13.next = 4;
                return (0, _index.query)(getQuery, [userId, messageId]);

              case 4:
                _ref11 = _context13.sent;
                rows = _ref11.rows;
                return _context13.abrupt("return", {
                  status: 200,
                  data: rows[0]
                });

              case 9:
                _context13.prev = 9;
                _context13.t0 = _context13["catch"](1);
                return _context13.abrupt("return", {
                  status: 500,
                  error: 'something went wrong'
                });

              case 12:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[1, 9]]);
      }));

      function getOneMessage(_x16, _x17, _x18, _x19) {
        return _getOneMessage.apply(this, arguments);
      }

      return getOneMessage;
    }()
  }, {
    key: "readMessage",
    value: function () {
      var _readMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14(userId, messageId, table, field) {
        var dbQuery, getQuery, res;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                dbQuery = "UPDATE ".concat(table, " SET read=$1 WHERE messageid=$2 AND ").concat(field, "=$3 returning *");
                _context14.prev = 1;
                _context14.next = 4;
                return (0, _index.query)('BEGIN');

              case 4:
                _context14.next = 6;
                return (0, _index.query)(dbQuery, ['true', messageId, userId]);

              case 6:
                getQuery = "SELECT emails.id as id,  emails.subject as subject, emails.message as message, emails.parentmessageid as parentMessageId,\n    emails.status as status, inboxs.receiverid as receiverId, inboxs.senderid as senderId, inboxs.read as read, inboxs.createdat as createdOn\n    FROM inboxs\n    INNER JOIN emails ON inboxs.messageid = emails.id  WHERE inboxs.receiverid = $1 AND inboxs.messageid =$2";
                _context14.next = 9;
                return (0, _index.query)(getQuery, [userId, messageId]);

              case 9:
                res = _context14.sent;
                _context14.next = 12;
                return (0, _index.query)('COMMIT');

              case 12:
                return _context14.abrupt("return", {
                  success: true,
                  data: res.rows
                });

              case 15:
                _context14.prev = 15;
                _context14.t0 = _context14["catch"](1);
                _context14.next = 19;
                return (0, _index.query)('ROLLBACK');

              case 19:
                return _context14.abrupt("return", {
                  success: false,
                  error: 'something went wrong'
                });

              case 20:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[1, 15]]);
      }));

      function readMessage(_x20, _x21, _x22, _x23) {
        return _readMessage.apply(this, arguments);
      }

      return readMessage;
    }()
  }, {
    key: "getAnInboxMessage",
    value: function () {
      var _getAnInboxMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15(_ref12) {
        var userId, messageId, exists, res;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                userId = _ref12.userId, messageId = _ref12.messageId;
                _context15.next = 3;
                return this.messageExists(userId, messageId, 'inboxs', 'receiverid');

              case 3:
                exists = _context15.sent;

                if (!exists.success) {
                  _context15.next = 11;
                  break;
                }

                _context15.next = 7;
                return this.readMessage(userId, messageId, 'inboxs', 'receiverid');

              case 7:
                res = _context15.sent;

                if (!res.success) {
                  _context15.next = 10;
                  break;
                }

                return _context15.abrupt("return", {
                  status: 200,
                  data: res.data
                });

              case 10:
                return _context15.abrupt("return", {
                  status: 500,
                  error: res.error
                });

              case 11:
                return _context15.abrupt("return", {
                  status: 200,
                  data: []
                });

              case 12:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function getAnInboxMessage(_x24) {
        return _getAnInboxMessage.apply(this, arguments);
      }

      return getAnInboxMessage;
    }()
  }]);

  return Email;
}();

exports.Email = Email;