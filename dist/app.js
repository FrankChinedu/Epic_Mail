"use strict";

require("dotenv/config");

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

var _api = _interopRequireDefault(require("./routes/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-dynamic-require */
var swaggerDocument = _yamljs.default.load("".concat(__dirname, "/../swagger.yaml"));

var app = (0, _express.default)();
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument));
app.use((0, _cors.default)({
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)('combined'));
app.use(_bodyParser.default.json());
app.use((0, _cors.default)());
var apiURL = '/api/v1';
global.apiURL = apiURL;
app.use('/', function (req, res, next) {
  if (req.originalUrl !== '/') {
    next();
    return;
  }
  /* istanbul ignore next */


  res.send({
    message: 'welcome to EPIC MAIL'
  });
});
Object.keys(_api.default).forEach(function (key) {
  var value = _api.default[key];
  app.use("".concat(apiURL, "/"), value);
});
/* istanbul ignore next */

app.use(function (req, res) {
  /* istanbul ignore next */
  res.status(404);
  /* istanbul ignore next */

  res.send({
    error: 'not found'
  });
});

if (!module.parent) {
  /* istanbul ignore next */
  app.listen(process.env.PORT, function () {
    /* istanbul ignore next */
    console.log("server start at port ".concat(process.env.PORT, " "));
  });
}

module.exports = app;