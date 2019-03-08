"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

var _global = global,
    apiURL = _global.apiURL;
describe('Message ', function () {
  describe('/Post /messages', function () {
    it('user should be able to create or send email', function (done) {
      var data = {
        subject: 'awesome subject',
        message: 'thank God i am awesome',
        status: 'draft',
        contactEmail: 'paul@taru.com'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/messages")).send(data).end(function (err, res) {
        res.should.have.status(201);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.status.should.equal(201);
      });

      done();
    });
  });
  describe('/GET /messages', function () {
    it('user should be able to get all received emails as inbox', function (done) {
      _chai.default.request(_app.default).get("".concat(apiURL, "/messages")).end(function (err, res) {
        res.should.have.status(200);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.status.should.equal(200);
      });

      done();
    });
  });
  describe('/GET /messages/unread', function () {
    it('user should be able to get all unread messages', function (done) {
      _chai.default.request(_app.default).get("".concat(apiURL, "/messages/unread")).end(function (err, res) {
        res.should.have.status(200);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.status.should.equal(200);
      });

      done();
    });
  });
  describe('/DELETE /messages/:id', function () {
    it('user should be able to delete a message from there inbox', function (done) {
      _chai.default.request(_app.default).delete("".concat(apiURL, "/messages/:id")).end(function (err, res) {
        res.should.have.status(202);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.status.should.equal(202);
      });

      done();
    });
  });
  describe('/GET /messages/:id', function () {
    it('user should be able to get a specific user email from the inbox', function (done) {
      _chai.default.request(_app.default).get("".concat(apiURL, "/messages/:id")).end(function (err, res) {
        res.should.have.status(200);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.status.should.equal(200);
      });

      done();
    });
  });
  describe('/GET /messages/sent', function () {
    it('user should be able to get all sent messages ', function (done) {
      _chai.default.request(_app.default).get("".concat(apiURL, "/messages/sent")).end(function (err, res) {
        res.should.have.status(200);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.status.should.equal(200);
      });

      done();
    });
  });
});