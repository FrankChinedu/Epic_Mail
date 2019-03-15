"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

var _global = global,
    apiURL = _global.apiURL;
describe('Auth Sign up', function () {
  describe('/Post auth/signup', function () {
    it('user should be able to sign up', function (done) {
      var data = {
        firstName: 'frank',
        lastName: 'angelo',
        email: 'frank@me.com',
        password: '12345678'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/signup")).send(data).end(function (err, res) {
        res.should.have.status(201);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.status.should.equal(201);
      });

      done();
    });
  });
  describe('/Post auth/signup', function () {
    it('user should not be able to sign in if email parameter is missing ', function (done) {
      var data = {
        firstName: 'frank',
        lastName: 'angelo',
        email: '',
        password: '12345678'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/signup")).send(data).end(function (err, res) {
        res.should.have.status(403);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
      });

      done();
    });
  });
  describe('/Post auth/signup', function () {
    it('user should not be able to sign in if password parameter is missing ', function (done) {
      var data = {
        firstName: 'frank',
        lastName: 'angelo',
        email: 'frank@me.com',
        password: ''
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/signup")).send(data).end(function (err, res) {
        res.should.have.status(403);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
      });

      done();
    });
  });
  describe('/Post auth/signup', function () {
    it('user should not be able to sign in if first name parameter is missing', function (done) {
      var data = {
        firstName: '',
        lastName: 'angelo',
        email: 'frank@me.com',
        password: '12345678'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/signup")).send(data).end(function (err, res) {
        res.should.have.status(403);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
      });

      done();
    });
  });
  describe('/Post auth/signup', function () {
    it('user should not be able to sign in if no parameter is missing', function (done) {
      var data = {};

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/signup")).send(data).end(function (err, res) {
        res.should.have.status(403);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
      });

      done();
    });
  });
  describe('/Post auth/login', function () {
    it('user should be able to login', function (done) {
      var data = {
        email: 'frank@me.com',
        password: '12345678'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/login")).send(data).end(function (err, res) {
        res.should.have.status(201);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.status.should.equal(201);
      });

      done();
    });
    it('user should not be able to login if wrong parameters are passed', function (done) {
      var data = {
        email: 'franki@me.com',
        password: '123456789'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/login")).send(data).end(function (err, res) {
        res.should.have.status(403);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
      });

      done();
    });
  });
});