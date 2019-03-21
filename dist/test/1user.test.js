"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

var _global = global,
    apiURL = _global.apiURL;
describe(' Sign up', function () {
  describe('sign up', function () {
    it('should create an account for a new user', function (done) {
      var data = {
        firstname: 'frank',
        lastname: 'angelo',
        email: 'angelo@me.com',
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
        done();
      });
    });
  });
  describe('sign up', function () {
    it('should create an account for a new user', function (done) {
      var data = {
        firstname: 'john',
        lastname: 'doe',
        email: 'john@doe.com',
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
    it('should not be able to sign up a new user if email parameter is missing ', function (done) {
      var data = {
        firstname: 'frank',
        lastname: 'angelo',
        email: '',
        password: '12345678'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/signup")).send(data).end(function (err, res) {
        res.should.have.status(401);
      });

      done();
    });
  });
  describe('/Post auth/signup', function () {
    it('should not be able to sign up a new user if password parameter is missing ', function (done) {
      var data = {
        firstname: 'frank',
        lastname: 'angelo',
        email: 'angelo@me.com',
        password: ''
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/signup")).send(data).end(function (err, res) {
        res.should.have.status(401);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
      });

      done();
    });
  });
  describe('/Post auth/signup', function () {
    it('should not be able to sign up a new user if first name parameter is missing', function (done) {
      var data = {
        firstname: '',
        lastname: 'angelo',
        email: 'angelo@me.com',
        password: '12345678'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/signup")).send(data).end(function (err, res) {
        res.should.have.status(401);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
      });

      done();
    });
  });
  describe('/Post auth/signup', function () {
    it('should not be able to sign up a new user if no parameter is missing', function (done) {
      var data = {};

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/signup")).send(data).end(function (err, res) {
        res.should.have.status(401);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
      });

      done();
    });
  });
  describe('/Post auth/login', function () {
    it('should log a user in', function (done) {
      var data = {
        email: 'angelo@me.com',
        password: '12345678'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/login")).send(data).end(function (err, res) {
        res.should.have.status(200);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.status.should.equal(200);
        done();
      });
    });
    it('should not be able to log a user in if wrong parameters are passed', function (done) {
      var data = {
        email: 'franki@me.com',
        password: '123456789'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/login")).send(data).end(function (err, res) {
        res.should.have.status(409);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
      });

      done();
    });
  });
});