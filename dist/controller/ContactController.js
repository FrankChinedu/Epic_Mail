"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ContactServices = _interopRequireDefault(require("../services/ContactServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ContactController =
/*#__PURE__*/
function () {
  function ContactController() {
    _classCallCheck(this, ContactController);
  }

  _createClass(ContactController, null, [{
    key: "addContact",
    value: function () {
      var _addContact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var email, userId, data, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = req.body.email;
                userId = req.user.id;
                data = {
                  email: email,
                  userId: userId
                };
                _context.next = 5;
                return _ContactServices.default.addContact(data);

              case 5:
                response = _context.sent;

                if (response.status === 201) {
                  res.status(201).send(response);
                } else {
                  res.status(400).send(response);
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addContact(_x, _x2) {
        return _addContact.apply(this, arguments);
      }

      return addContact;
    }()
  }, {
    key: "getAllUserContacts",
    value: function () {
      var _getAllUserContacts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var userId, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = req.user.id;
                _context2.next = 3;
                return _ContactServices.default.getAllUserContacts(userId);

              case 3:
                response = _context2.sent;

                if (response.status === 200) {
                  res.status(200).send(response);
                } else {
                  /* istanbul ignore next */
                  res.status(400).send(response);
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllUserContacts(_x3, _x4) {
        return _getAllUserContacts.apply(this, arguments);
      }

      return getAllUserContacts;
    }()
  }, {
    key: "deleteContact",
    value: function () {
      var _deleteContact = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var userId, id, data, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = req.user.id;
                id = req.params.id;
                data = {
                  userId: userId,
                  id: id
                };
                _context3.next = 5;
                return _ContactServices.default.deleteContact(data);

              case 5:
                response = _context3.sent;

                if (response.status === 202) {
                  res.status(202).send(response);
                } else {
                  res.status(404).send(response);
                }

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function deleteContact(_x5, _x6) {
        return _deleteContact.apply(this, arguments);
      }

      return deleteContact;
    }()
  }]);

  return ContactController;
}();

exports.default = ContactController;