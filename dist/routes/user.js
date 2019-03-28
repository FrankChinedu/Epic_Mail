"use strict";

var _express = _interopRequireDefault(require("express"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

var _UserController = _interopRequireDefault(require("../controller/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoute = _express.default.Router();

userRoute.post('/auth/signup', _Auth.default.trimmer, _Auth.default.validate, _Auth.default.emailToLowerCase, _UserController.default.createUser);
userRoute.post('/auth/login', _Auth.default.trimmer, _Auth.default.verifyLogin, _Auth.default.emailToLowerCase, _UserController.default.login);
userRoute.post('/auth/reset', _Auth.default.trimmer, _UserController.default.reset);
userRoute.post('/auth/reset-password', _Auth.default.trimmer, _Auth.default.verifyToken, _UserController.default.resetPassword);
module.exports = userRoute;