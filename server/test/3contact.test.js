import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const should = chai.should();

chai.use(chaiHttp);

let accessToken;

const { apiURL } = global;

describe('Contacts ', () => {
  describe('/Post auth/login', () => {
    it('should log a user in', (done) => {
      const data = {
        email: 'angelo@me.com',
        password: '12345678',
      };
      chai.request(server)
        .post(`${apiURL}/auth/login`)
        .send(data)
        .end((err, res) => {
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

  describe('Contacts  ', () => {
    it('should add a user to be a contact', (done) => {
      const data = {
        email: 'john@doe.com',
      };
      chai.request(server)
        .post(`${apiURL}/contacts`)
        .send(data)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(201);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.equal(201);
          done();
        });
    });

    it('should not add user if user is already a contact ', (done) => {
      const data = {
        email: 'john@doe.com',
      };
      chai.request(server)
        .post(`${apiURL}/contacts`)
        .send(data)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.equal(400);
          done();
        });
    });

    it('should get all users contacts', (done) => {
      chai.request(server)
        .get(`${apiURL}/contacts`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.equal(200);
          done();
        });
    });

    it('should delete a user\'s contact ', (done) => {
      chai.request(server)
        .delete(`${apiURL}/contacts/1`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(202);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.equal(202);
          done();
        });
    });

    it('should return 404 if user is already deleted or does not exist ', (done) => {
      chai.request(server)
        .delete(`${apiURL}/contacts/1`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
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
