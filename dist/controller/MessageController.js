"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MessageServices = _interopRequireDefault(require("../services/MessageServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageController =
/*#__PURE__*/
function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: "createMessage",
    value: function createMessage(req, res) {
      var userId = 1; // this would be provided from jwt

      var data = _objectSpread({}, req.body, {
        userId: userId
      });

      var status = data.status;
      var response;

      if (status === 'sent') {
        response = MessageController.sendMessage(data);
      } else {
        response = MessageController.saveAsDraft(data);
      }

      res.status(201).send(response);
    }
  }, {
    key: "saveAsDraft",
    value: function saveAsDraft(data) {
      return _MessageServices.default.saveDraft(data);
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(data) {
      return _MessageServices.default.sendMessage(data);
    }
  }, {
    key: "getRecievedEmails",
    value: function getRecievedEmails(req, res) {
      var userId = 1; // this would be provided from jwt

      res.status(200).send(_MessageServices.default.getRecievedEmails(userId));
    }
  }, {
    key: "getUnReadEmails",
    value: function getUnReadEmails(req, res) {
      var userId = 1;
      res.status(200).send(_MessageServices.default.getUnReadEmails(userId));
    }
  }, {
    key: "deleteAnInboxMessage",
    value: function deleteAnInboxMessage(req, res) {
      var userId = 1;
      var id = req.params.id;
      var data = {
        userId: userId,
        id: id
      };
      res.status(202).send(_MessageServices.default.deleteAnInboxMessage(data));
    }
  }, {
    key: "viewAnInboxMessage",
    value: function viewAnInboxMessage(req, res) {
      var userId = 1;
      var id = req.params.id;
      var data = {
        userId: userId,
        id: id
      };
      res.status(200).send(_MessageServices.default.viewAnInboxMessage(data));
    }
  }, {
    key: "getSentEmails",
    value: function getSentEmails(req, res) {
      var userId = 1;
      res.status(200).send(_MessageServices.default.getSentEmails(userId));
    }
  }]);

  return MessageController;
}();

exports.default = MessageController;