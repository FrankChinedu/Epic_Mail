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
describe('Groups ', function () {
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
  describe('Groups ', function () {
    it('should create a group', function (done) {
      var data = {
        name: 'group test'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/groups")).send(data).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(201);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data'); // res.body.data.should.be.a('array');

        res.body.status.should.equal(201);
        done();
      });
    });
    it('should get all users groups', function (done) {
      _chai.default.request(_app.default).get("".concat(apiURL, "/groups")).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(200);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data'); // res.body.data.should.be.a('array');

        res.body.status.should.equal(200);
        done();
      });
    });
    it('should update a groups name', function (done) {
      _chai.default.request(_app.default).patch("".concat(apiURL, "/groups/1/name")).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(200);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data'); // res.body.data.should.be.a('array');

        res.body.status.should.equal(200);
        done();
      });
    });
    it('should return 404 if not found group', function (done) {
      _chai.default.request(_app.default).patch("".concat(apiURL, "/groups/2/name")).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(404);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data'); // res.body.data.should.be.a('array');

        res.body.status.should.equal(404);
        done();
      });
    });
    it('should delete a users group that they own', function (done) {
      _chai.default.request(_app.default).delete("".concat(apiURL, "/groups/1")).set('x-access-token', accessToken).end(function (err, res) {
        res.should.have.status(202);
        should.exist(res.body);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data'); // res.body.data.should.be.a('array');

        res.body.status.should.equal(202);
        done();
      });
    });
    it('should add users to a particular group', function (done) {
      var data = {
        emails: ['john@doe.com']
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/groups/1/users")).send(data).set('x-access-token', accessToken).end(function (err, res) {
        if (res.body.status === 200) {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data'); // res.body.data.should.be.a('array');

          res.body.status.should.equal(200);
        } else {
          res.should.have.status(400);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data'); // res.body.data.should.be.a('array');

          res.body.status.should.equal(400);
        }

        done();
      });
    });
    it('should send a bulk message to all the members in the group', function (done) {
      var data = {
        subject: 'something amazing',
        message: 'there would be group meeting',
        status: 'sent'
      };

      _chai.default.request(_app.default).post("".concat(apiURL, "/groups/1/messages")).send(data).set('x-access-token', accessToken).end(function (err, res) {
        if (res.body.status === 201) {
          res.should.have.status(201);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data'); // res.body.data.should.be.a('array');

          res.body.status.should.equal(201);
        } else {
          res.should.have.status(400);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data'); // res.body.data.should.be.a('array');

          res.body.status.should.equal(400);
        }

        done();
      });
    });
    it('should delete a memeber from your group', function (done) {
      _chai.default.request(_app.default).delete("".concat(apiURL, "/groups/1/users/1")).set('x-access-token', accessToken).end(function (err, res) {
        if (res.body.status === 202) {
          res.should.have.status(202);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data'); // res.body.data.should.be.a('array');

          res.body.status.should.equal(202);
        } else {
          res.should.have.status(403);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data'); // res.body.data.should.be.a('array');

          res.body.status.should.equal(403);
        }

        done();
      });
    });
  });
});