"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

var accessToken;
var _global = global,
    apiURL = _global.apiURL;
describe('Contacts ', function () {
  describe('/Post auth/login', function () {
    it('should log a user in', function (done) {
      var data = {
        email: 'angelo@me.com',
        password: '12345678'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/auth/login")).send(data).end(function (err, res) {
        accessToken = res.body.data.token;
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
  });
  describe('Contacts  ', function () {
    it('should add a user to be a contact', function (done) {
      var data = {
        email: 'john@doe.com'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/contacts")).send(data).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(201);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.equal(201);
        done();
      });
    });
    it('should not add user if user is already a contact ', function (done) {
      var data = {
        email: 'john@doe.com'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/contacts")).send(data).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(400);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.equal(400);
        done();
      });
    });
    it('should get all users contacts', function (done) {
      _chai.default.request(_app.default).get("".concat(apiURL, "/contacts")).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(200);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.equal(200);
        done();
      });
    });
    it('should delete a user\'s contact ', function (done) {
      _chai.default.request(_app.default).delete("".concat(apiURL, "/contacts/1")).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(202);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.equal(202);
        done();
      });
    });
    it('should return 404 if user is already deleted or does not exist ', function (done) {
      _chai.default.request(_app.default).delete("".concat(apiURL, "/contacts/1")).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(404);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.equal(404);
        done();
      });
    });
  });
});