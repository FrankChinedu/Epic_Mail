"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupMember = void 0;

var _index = require("../db/index");

var _Helpers = _interopRequireDefault(require("../helpers/Helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GroupMember =
/*#__PURE__*/
function () {
  function GroupMember() {
    _classCallCheck(this, GroupMember);
  }

  _createClass(GroupMember, null, [{
    key: "createMemberTable",

    /* istanbul ignore next */
    value: function () {
      var _createMemberTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /* istanbul ignore next */
                queryText = "CREATE TABLE IF NOT EXISTS\n        groupmembers(\n          id SERIAL NOT NULL UNIQUE PRIMARY KEY,\n          groupId INTEGER,\n          memberId INTEGER,\n          userRole VARCHAR(128),\n          createdAt TIMESTAMP DEFAULT NOW(),\n          updatedAt TIMESTAMP DEFAULT NOW(),\n          FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE CASCADE,\n          FOREIGN KEY (memberId) REFERENCES contacts (id) ON DELETE CASCADE\n        )";
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

      function createMemberTable() {
        return _createMemberTable.apply(this, arguments);
      }

      return createMemberTable;
    }()
    /* istanbul ignore next */

  }, {
    key: "dropMemberTable",
    value: function () {
      var _dropMemberTable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var queryText;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                /* istanbul ignore next */
                queryText = 'DROP TABLE IF EXISTS groupmembers CASCADE';
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

      function dropMemberTable() {
        return _dropMemberTable.apply(this, arguments);
      }

      return dropMemberTable;
    }()
  }, {
    key: "removeMemberFromGroup",
    value: function () {
      var _removeMemberFromGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var userId, memberId, groupId, getGroup, delQuery, res, userGroupsIds, userOwnsGroup, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = _ref.userId, memberId = _ref.memberId, groupId = _ref.groupId;
                getGroup = ' SELECT * FROM groups WHERE ownerid=$1';
                delQuery = 'DELETE FROM groupmembers WHERE memberid=$1 AND groupid=$2 returning *';
                _context3.prev = 3;
                _context3.next = 6;
                return (0, _index.query)(getGroup, [userId]);

              case 6:
                res = _context3.sent;
                userGroupsIds = [];
                res.rows.forEach(function (data) {
                  userGroupsIds.push(data.id);
                });
                userOwnsGroup = userGroupsIds.some(function (id) {
                  return parseInt(id, 0) === parseInt(groupId, 0);
                });

                if (!userOwnsGroup) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 13;
                return (0, _index.query)(delQuery, [memberId, groupId]);

              case 13:
                _ref2 = _context3.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt("return", {
                  status: 404,
                  data: 'no result'
                });

              case 17:
                return _context3.abrupt("return", {
                  status: 202,
                  data: 'deleted successfully'
                });

              case 18:
                return _context3.abrupt("return", {
                  status: 403,
                  data: 'Unauthorized'
                });

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](3);
                return _context3.abrupt("return", {
                  status: 500,
                  error: _context3.t0
                });

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 21]]);
      }));

      function removeMemberFromGroup(_x) {
        return _removeMemberFromGroup.apply(this, arguments);
      }

      return removeMemberFromGroup;
    }()
  }, {
    key: "retriveMembersEmails",
    value: function () {
      var _retriveMembersEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref3) {
        var groupId, userId, qry, res, dbQuery, _ref4, rows, groupMembersId, groupMembersEmails;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                groupId = _ref3.groupId, userId = _ref3.userId;
                qry = 'SELECT * FROM groups WHERE id=$1 AND ownerid=$2';
                _context4.next = 4;
                return (0, _index.query)(qry, [groupId, userId]);

              case 4:
                res = _context4.sent;

                if (res.rows[0]) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", {
                  status: 403,
                  success: false,
                  data: 'Unauthorized'
                });

              case 7:
                dbQuery = 'SELECT * FROM groupmembers WHERE groupid=$1';
                _context4.next = 10;
                return (0, _index.query)(dbQuery, [groupId]);

              case 10:
                _ref4 = _context4.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context4.next = 14;
                  break;
                }

                return _context4.abrupt("return", {
                  status: 200,
                  success: false,
                  data: 'you dont have any members in this group'
                });

              case 14:
                groupMembersId = [];
                rows.forEach(function (member) {
                  groupMembersId.push(member.memberid);
                });
                _context4.next = 18;
                return this.getGroupMembersEmails(groupMembersId);

              case 18:
                groupMembersEmails = _context4.sent;
                return _context4.abrupt("return", {
                  success: true,
                  emails: groupMembersEmails
                });

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function retriveMembersEmails(_x2) {
        return _retriveMembersEmails.apply(this, arguments);
      }

      return retriveMembersEmails;
    }()
  }, {
    key: "getGroupMembersEmails",
    value: function () {
      var _getGroupMembersEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(groupMembersId) {
        var groupMembersEmails;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                groupMembersEmails = []; // eslint-disable-next-line consistent-return

                _context6.next = 3;
                return _Helpers.default.asyncForEach(groupMembersId,
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee5(id) {
                    var getQuery, resp;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            getQuery = 'SELECT * FROM contacts WHERE id=$1';
                            _context5.prev = 1;
                            _context5.next = 4;
                            return (0, _index.query)(getQuery, [id]);

                          case 4:
                            resp = _context5.sent;

                            if (resp.rows[0]) {
                              groupMembersEmails.push(resp.rows[0].email);
                            }

                            _context5.next = 11;
                            break;

                          case 8:
                            _context5.prev = 8;
                            _context5.t0 = _context5["catch"](1);
                            return _context5.abrupt("return", _context5.t0);

                          case 11:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5, null, [[1, 8]]);
                  }));

                  return function (_x4) {
                    return _ref5.apply(this, arguments);
                  };
                }());

              case 3:
                return _context6.abrupt("return", groupMembersEmails);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getGroupMembersEmails(_x3) {
        return _getGroupMembersEmails.apply(this, arguments);
      }

      return getGroupMembersEmails;
    }()
  }]);

  return GroupMember;
}();

exports.GroupMember = GroupMember;