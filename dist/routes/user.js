"use strict";

var _express = _interopRequireDefault(require("express"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

var _UserController = _interopRequireDefault(require("../controller/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoute = _express.default.Router();

userRoute.post('/auth/signup', _Auth.default.validate, _UserController.default.createUser);
userRoute.post('/auth/login', _UserController.default.login);
userRoute.post('/auth/reset', _UserController.default.reset);
module.exports = userRoute;