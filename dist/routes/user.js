"use strict";

var _express = _interopRequireDefault(require("express"));

var _Auth = _interopRequireDefault(require("../middleware/Auth"));

var _UserController = _interopRequireDefault(require("../controller/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoute = _express.default.Router();

userRoute.post('/auth/signup', _Auth.default.validate, _Auth.default.emailExist, _UserController.default.createUser);
userRoute.post('/auth/login', _UserController.default.login);
userRoute.get('/allUsers', _UserController.default.allUsers); // userRoute.get('/user', (req, res) => {
//   res.status(200).send({
//     message: 'users ----',
//   });
// });

module.exports = userRoute;