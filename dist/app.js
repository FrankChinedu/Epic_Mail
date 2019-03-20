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

var _index = require("./model/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

  res.send({
    message: 'welcome to EPIC MAIL'
  });
});
Object.keys(_api.default).forEach(function (key) {
  var value = _api.default[key];
  app.use("".concat(apiURL, "/"), value);
});
app.use(function (req, res) {
  res.status(404);
  res.send({
    error: 'not found'
  });
});

var create =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(go) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (go) {
              // console.log('go');
              // dropAllTables();
              (0, _index.createAllTables)();
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x) {
    return _ref.apply(this, arguments);
  };
}();

create(true);

if (!module.parent) {
  app.listen(process.env.PORT, function () {
    console.log("server start at port ".concat(process.env.PORT, " "));
  });
}

module.exports = app;