"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _ContactController = _interopRequireDefault(require("../controller/ContactController"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contactRoute = _express.default.Router();

contactRoute.post('/contacts', _Auth.default.trimmer, _Auth.default.verifyToken, _Auth.default.magicValidator, _ContactController.default.addContact);
contactRoute.get('/contacts', _Auth.default.verifyToken, _ContactController.default.getAllUserContacts);
contactRoute.delete('/contacts/:id', _Auth.default.verifyToken, _ContactController.default.deleteContact);
var _default = contactRoute;
exports.default = _default;