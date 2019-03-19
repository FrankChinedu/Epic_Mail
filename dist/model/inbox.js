"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Inbox = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = require("../db/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Inbox =
/*#__PURE__*/
function () {
  function Inbox() {
    _classCallCheck(this, Inbox);
  }

  _createClass(Inbox, null, [{
    key: "insertIntoInboxTable",
    value: function () {
      var _insertIntoInboxTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var userId, messageId, receiverId, findQuery, values, _ref2, rows, id;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = _ref.userId, messageId = _ref.messageId, receiverId = _ref.receiverId;
                findQuery = "INSERT INTO\n    inboxs(senderid, receiverid, messageid, read, createdat, updatedat) \n    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *\n    ";
                values = [userId, receiverId, messageId, false, (0, _moment.default)(new Date()), (0, _moment.default)(new Date())];
                _context.prev = 3;
                _context.next = 6;
                return (0, _index.query)(findQuery, values);

              case 6:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", {
                  success: false,
                  error: 'an error occured'
                });

              case 10:
                id = rows[0].id;
                return _context.abrupt("return", {
                  success: true,
                  id: id
                });

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return", {
                  success: false,
                  error: _context.t0
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 14]]);
      }));

      function insertIntoInboxTable(_x) {
        return _insertIntoInboxTable.apply(this, arguments);
      }

      return insertIntoInboxTable;
    }()
    /* istanbul ignore next */

  }, {
    key: "createInboxTable",
    value: function () {
      var _createInboxTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                /* istanbul ignore next */
                queryText = "CREATE TABLE IF NOT EXISTS\n      inboxs(\n        id SERIAL NOT NULL UNIQUE PRIMARY KEY,\n        receiverId INTEGER,\n        senderId INTEGER,\n        messageId INTEGER,\n        read BOOLEAN,\n        createdAt TIMESTAMP,\n        updatedAt TIMESTAMP,\n        FOREIGN KEY (receiverId) REFERENCES users (id) ON DELETE CASCADE,\n        FOREIGN KEY (senderId) REFERENCES users (id) ON DELETE CASCADE,\n        FOREIGN KEY (messageId) REFERENCES emails (id) ON DELETE CASCADE\n      )";
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

      function createInboxTable() {
        return _createInboxTable.apply(this, arguments);
      }

      return createInboxTable;
    }()
    /* istanbul ignore next */

  }, {
    key: "dropInboxTable",
    value: function () {
      var _dropInboxTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                /* istanbul ignore next */
                queryText = 'DROP TABLE IF EXISTS inboxs CASCADE';
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

      function dropInboxTable() {
        return _dropInboxTable.apply(this, arguments);
      }

      return dropInboxTable;
    }()
  }]);

  return Inbox;
}();

exports.Inbox = Inbox;