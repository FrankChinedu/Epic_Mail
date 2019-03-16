import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const should = chai.should();

chai.use(chaiHttp);

let accessToken;

const { apiURL } = global;

describe('Groups ', () => {
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

  describe('create group', () => {
    it('should create a group', (done) => {
      const data = {
        name: 'group test',
      };
      chai.request(server)
        .post(`${apiURL}/messages`)
        .send(data)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(201);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(201);
          done();
        });
    });

    it('should get all users groups', (done) => {
      chai.request(server)
        .get(`${apiURL}/messages`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(200);
          done();
        });
    });
  });
});
