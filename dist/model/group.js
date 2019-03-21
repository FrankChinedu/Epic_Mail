"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = void 0;

var _index = require("../db/index");

var _Helpers = _interopRequireDefault(require("../helpers/Helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Group =
/*#__PURE__*/
function () {
  function Group() {
    _classCallCheck(this, Group);
  }

  _createClass(Group, null, [{
    key: "createGroupTable",

    /* istanbul ignore next */
    value: function () {
      var _createGroupTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /* istanbul ignore next */
                queryText = "CREATE TABLE IF NOT EXISTS\n        groups(\n          id SERIAL NOT NULL UNIQUE PRIMARY KEY,\n          name VARCHAR(128) NOT NULL,\n          role VARCHAR(128),\n          ownerId INTEGER,\n          createdAt TIMESTAMP DEFAULT NOW(),\n          updatedAt TIMESTAMP DEFAULT NOW(),\n          FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE\n        )";
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

      function createGroupTable() {
        return _createGroupTable.apply(this, arguments);
      }

      return createGroupTable;
    }()
    /* istanbul ignore next */

  }, {
    key: "dropGroupTable",
    value: function () {
      var _dropGroupTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                /* istanbul ignore next */
                queryText = 'DROP TABLE IF EXISTS groups CASCADE';
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

      function dropGroupTable() {
        return _dropGroupTable.apply(this, arguments);
      }

      return dropGroupTable;
    }()
  }, {
    key: "createGroup",
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var name, userId, dbQuery, values, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                name = _ref.name, userId = _ref.userId;
                dbQuery = "INSERT INTO\n      groups(name, ownerid, role)\n      VALUES($1, $2, $3)\n      returning *";
                values = [name, userId, 'admin'];
                _context3.prev = 3;
                _context3.next = 6;
                return (0, _index.query)(dbQuery, values);

              case 6:
                _ref2 = _context3.sent;
                rows = _ref2.rows;
                return _context3.abrupt("return", {
                  success: true,
                  data: _objectSpread({}, rows[0])
                });

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](3);
                return _context3.abrupt("return", {
                  success: false,
                  error: _context3.t0
                });

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 11]]);
      }));

      function createGroup(_x) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "getAllGroup",
    value: function () {
      var _getAllGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(userId) {
        var dbQuery, values, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                dbQuery = 'SELECT id, name, role FROM groups WHERE ownerid=$1';
                values = [userId];
                _context4.prev = 2;
                _context4.next = 5;
                return (0, _index.query)(dbQuery, values);

              case 5:
                _ref3 = _context4.sent;
                rows = _ref3.rows;

                if (rows[0]) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", {
                  success: true,
                  data: []
                });

              case 9:
                return _context4.abrupt("return", {
                  success: true,
                  data: rows
                });

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](2);
                return _context4.abrupt("return", {
                  success: false,
                  error: _context4.t0
                });

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 12]]);
      }));

      function getAllGroup(_x2) {
        return _getAllGroup.apply(this, arguments);
      }

      return getAllGroup;
    }()
  }, {
    key: "editGroup",
    value: function () {
      var _editGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref4) {
        var userId, id, name, find, _ref5, rows, update, values, response;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userId = _ref4.userId, id = _ref4.id, name = _ref4.name;
                find = 'SELECT * FROM groups WHERE id=$1 AND ownerid = $2';
                _context5.prev = 2;
                _context5.next = 5;
                return (0, _index.query)(find, [id, userId]);

              case 5:
                _ref5 = _context5.sent;
                rows = _ref5.rows;

                if (rows[0]) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", {
                  success: false,
                  data: 'not found'
                });

              case 9:
                update = 'UPDATE groups SET name=$1 WHERE ownerid=$2 AND id=$3 returning *';
                values = [name || rows[0].name, userId, id];
                _context5.next = 13;
                return (0, _index.query)(update, values);

              case 13:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  success: true,
                  data: [{
                    id: response.rows[0].id,
                    name: response.rows[0].name,
                    role: response.rows[0].role
                  }]
                });

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", {
                  success: false,
                  error: _context5.t0
                });

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 17]]);
      }));

      function editGroup(_x3) {
        return _editGroup.apply(this, arguments);
      }

      return editGroup;
    }()
  }, {
    key: "sendGroupMessage",
    value: function () {
      var _sendGroupMessage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(membersEmails, data) {
        var userId, subject, message, status, dbQuery, values, result, msg, messageId;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                userId = data.userId, subject = data.subject, message = data.message, status = data.status;
                _context7.prev = 1;
                _context7.next = 4;
                return (0, _index.query)('BEGIN');

              case 4:
                dbQuery = "INSERT INTO emails(subject, message, status)\n        VALUES($1, $2, $3) returning *";
                values = [subject, message, status];
                _context7.next = 8;
                return (0, _index.query)(dbQuery, values);

              case 8:
                result = _context7.sent;
                msg = result.rows[0];
                messageId = msg.id;
                _context7.next = 13;
                return _Helpers.default.asyncForEach(membersEmails,
                /*#__PURE__*/
                function () {
                  var _ref6 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee6(recieversEmail) {
                    var getReceiver, res, receiverId, inboxQuery, inboxValue, sentQuery, sentValue;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            getReceiver = 'SELECT * FROM users WHERE email=$1';
                            _context6.next = 3;
                            return (0, _index.query)(getReceiver, [recieversEmail]);

                          case 3:
                            res = _context6.sent;
                            receiverId = res.rows[0].id;
                            inboxQuery = "INSERT INTO\n          inboxs(senderid, receiverid, messageid, read) \n          VALUES ($1, $2, $3, $4) RETURNING * ";
                            inboxValue = [userId, receiverId, messageId, false];
                            _context6.next = 9;
                            return (0, _index.query)(inboxQuery, inboxValue);

                          case 9:
                            sentQuery = "INSERT INTO\n          sents(senderid, receiverid, messageid, read) \n          VALUES ($1, $2, $3, $4) RETURNING * ";
                            sentValue = [userId, receiverId, messageId, false];
                            _context6.next = 13;
                            return (0, _index.query)(sentQuery, sentValue);

                          case 13:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x6) {
                    return _ref6.apply(this, arguments);
                  };
                }());

              case 13:
                _context7.next = 15;
                return (0, _index.query)('COMMIT');

              case 15:
                return _context7.abrupt("return", {
                  id: messageId,
                  createdOn: msg.createdat,
                  subject: msg.subject,
                  message: msg.message,
                  parentMessageId: msg.parentmessageid,
                  status: msg.status
                });

              case 18:
                _context7.prev = 18;
                _context7.t0 = _context7["catch"](1);
                _context7.next = 22;
                return (0, _index.query)('ROLLBACK');

              case 22:
                return _context7.abrupt("return", {
                  statuc: 500,
                  error: 'something went wrong'
                });

              case 23:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[1, 18]]);
      }));

      function sendGroupMessage(_x4, _x5) {
        return _sendGroupMessage.apply(this, arguments);
      }

      return sendGroupMessage;
    }()
  }, {
    key: "deleteGroup",
    value: function () {
      var _deleteGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(_ref7) {
        var userId, id, dbQuery, _ref8, rows;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                userId = _ref7.userId, id = _ref7.id;
                dbQuery = 'DELETE FROM groups WHERE id=$1 AND ownerid=$2 returning *';
                _context8.prev = 2;
                _context8.next = 5;
                return (0, _index.query)(dbQuery, [id, userId]);

              case 5:
                _ref8 = _context8.sent;
                rows = _ref8.rows;

                if (rows[0]) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return", {
                  status: 400,
                  data: 'no result'
                });

              case 9:
                return _context8.abrupt("return", {
                  status: 202,
                  data: 'deleted successfully'
                });

              case 12:
                _context8.prev = 12;
                _context8.t0 = _context8["catch"](2);
                return _context8.abrupt("return", {
                  status: 500,
                  error: _context8.t0
                });

              case 15:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[2, 12]]);
      }));

      function deleteGroup(_x7) {
        return _deleteGroup.apply(this, arguments);
      }

      return deleteGroup;
    }()
  }, {
    key: "getAllUserContactsFromPassedEmails",
    value: function getAllUserContactsFromPassedEmails(emails, userContacts) {
      var fromEmail = [];
      emails.forEach(function (email) {
        userContacts.forEach(function (data) {
          if (data.email === email) {
            fromEmail.push(data);
          }
        });
      });
      return fromEmail;
    }
  }, {
    key: "getMembersNotInGroup",
    value: function getMembersNotInGroup(membersInThisGroup, verifiedUsers) {
      var members = [];
      var membersIdArray = [];
      membersInThisGroup.forEach(function (elm) {
        membersIdArray.push(elm.memberid);
      });
      verifiedUsers.forEach(function (info) {
        var isInGroup = membersIdArray.some(function (id) {
          return id === info.id;
        });

        if (!isInGroup) {
          members.push(info);
        }
      });
      return members;
    }
  }, {
    key: "addContactToGroup",
    value: function () {
      var _addContactToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(_ref9) {
        var userId, id, emails, userContacts, verifiedUsers, membersInThisGroup, res, getMembersNotInGroup, _res;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                userId = _ref9.userId, id = _ref9.id, emails = _ref9.emails;
                _context9.next = 3;
                return this.userContacts(userId);

              case 3:
                userContacts = _context9.sent;

                if (!userContacts) {
                  _context9.next = 27;
                  break;
                }

                verifiedUsers = this.getAllUserContactsFromPassedEmails(emails, userContacts);

                if (!verifiedUsers.length) {
                  _context9.next = 26;
                  break;
                }

                _context9.next = 9;
                return this.membersInThisGroup(id);

              case 9:
                membersInThisGroup = _context9.sent;

                if (membersInThisGroup) {
                  _context9.next = 17;
                  break;
                }

                _context9.next = 13;
                return this.addNewMembers(verifiedUsers, id);

              case 13:
                res = _context9.sent;

                if (!res.success) {
                  _context9.next = 16;
                  break;
                }

                return _context9.abrupt("return", {
                  status: 200,
                  data: res.data
                });

              case 16:
                return _context9.abrupt("return", {
                  status: 500,
                  data: 'something went wrong'
                });

              case 17:
                getMembersNotInGroup = this.getMembersNotInGroup(membersInThisGroup, verifiedUsers);

                if (!getMembersNotInGroup.length) {
                  _context9.next = 25;
                  break;
                }

                _context9.next = 21;
                return this.addNewMembers(getMembersNotInGroup, id);

              case 21:
                _res = _context9.sent;

                if (!_res.success) {
                  _context9.next = 24;
                  break;
                }

                return _context9.abrupt("return", {
                  status: 200,
                  data: _res.data
                });

              case 24:
                return _context9.abrupt("return", {
                  status: 500,
                  data: 'something went wrong'
                });

              case 25:
                return _context9.abrupt("return", {
                  status: 400,
                  data: 'User(s) already exists'
                });

              case 26:
                return _context9.abrupt("return", {
                  status: 400,
                  data: 'kindly confirm your emails'
                });

              case 27:
                return _context9.abrupt("return", {
                  status: 400,
                  data: 'Kindly try adding some contacts into your contact list'
                });

              case 28:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function addContactToGroup(_x8) {
        return _addContactToGroup.apply(this, arguments);
      }

      return addContactToGroup;
    }()
  }, {
    key: "addNewMembers",
    value: function () {
      var _addNewMembers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(data, groupId) {
        var res, ids;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                res = {
                  success: false,
                  data: []
                };
                ids = [];
                data.forEach(function (x) {
                  ids.push(x.id);
                }); // eslint-disable-next-line consistent-return

                _context11.next = 5;
                return _Helpers.default.asyncForEach(ids,
                /*#__PURE__*/
                function () {
                  var _ref10 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee10(id) {
                    var dbQuery, _ref11, rows;

                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            dbQuery = "INSERT INTO groupmembers(groupid, memberid, userrole)\n      VALUES($1, $2, $3) returning *";
                            _context10.prev = 1;
                            _context10.next = 4;
                            return (0, _index.query)(dbQuery, [groupId, id, 'member']);

                          case 4:
                            _ref11 = _context10.sent;
                            rows = _ref11.rows;
                            res.success = true;
                            res.data.push({
                              id: rows[0].id,
                              userId: rows[0].memberid,
                              userRole: rows[0].userrole
                            });
                            _context10.next = 13;
                            break;

                          case 10:
                            _context10.prev = 10;
                            _context10.t0 = _context10["catch"](1);
                            return _context10.abrupt("return", {
                              err: _context10.t0
                            });

                          case 13:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10, null, [[1, 10]]);
                  }));

                  return function (_x11) {
                    return _ref10.apply(this, arguments);
                  };
                }());

              case 5:
                return _context11.abrupt("return", res);

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function addNewMembers(_x9, _x10) {
        return _addNewMembers.apply(this, arguments);
      }

      return addNewMembers;
    }()
  }, {
    key: "membersInThisGroup",
    value: function () {
      var _membersInThisGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(groupId) {
        var dbQuery, _ref12, rows;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                dbQuery = 'SELECT * FROM groupmembers WHERE groupid=$1 ';
                _context12.prev = 1;
                _context12.next = 4;
                return (0, _index.query)(dbQuery, [groupId]);

              case 4:
                _ref12 = _context12.sent;
                rows = _ref12.rows;

                if (!rows[0]) {
                  _context12.next = 8;
                  break;
                }

                return _context12.abrupt("return", rows);

              case 8:
                return _context12.abrupt("return", null);

              case 11:
                _context12.prev = 11;
                _context12.t0 = _context12["catch"](1);
                return _context12.abrupt("return", {
                  err: _context12.t0
                });

              case 14:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[1, 11]]);
      }));

      function membersInThisGroup(_x12) {
        return _membersInThisGroup.apply(this, arguments);
      }

      return membersInThisGroup;
    }()
  }, {
    key: "userContacts",
    value: function () {
      var _userContacts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(userId) {
        var dbQuery, emails, _ref13, rows;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                dbQuery = 'SELECT * FROM contacts WHERE contact_owner_id=$1';
                emails = [];
                _context13.next = 4;
                return (0, _index.query)(dbQuery, [userId]);

              case 4:
                _ref13 = _context13.sent;
                rows = _ref13.rows;

                if (!rows[0]) {
                  _context13.next = 9;
                  break;
                }

                rows.forEach(function (row) {
                  emails.push({
                    email: row.email,
                    id: row.id
                  });
                });
                return _context13.abrupt("return", emails);

              case 9:
                return _context13.abrupt("return", null);

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function userContacts(_x13) {
        return _userContacts.apply(this, arguments);
      }

      return userContacts;
    }()
  }]);

  return Group;
}();

exports.Group = Group;