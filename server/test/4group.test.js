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

  describe('Groups ', () => {
    it('should create a group', (done) => {
      const data = {
        name: 'group test',
      };
      chai.request(server)
        .post(`${apiURL}/groups`)
        .send(data)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(201);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          // res.body.data.should.be.a('array');
          res.body.status.should.equal(201);
          done();
        });
    });

    it('should get all users groups', (done) => {
      chai.request(server)
        .get(`${apiURL}/groups`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          // res.body.data.should.be.a('array');
          res.body.status.should.equal(200);
          done();
        });
    });

    it('should update a groups name', (done) => {
      chai.request(server)
        .patch(`${apiURL}/groups/1/name`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          // res.body.data.should.be.a('array');
          res.body.status.should.equal(200);
          done();
        });
    });

    it('should return 404 if not found group', (done) => {
      chai.request(server)
        .patch(`${apiURL}/groups/2/name`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(404);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          // res.body.data.should.be.a('array');
          res.body.status.should.equal(404);
          done();
        });
    });


    it('should delete a users group that they own', (done) => {
      chai.request(server)
        .delete(`${apiURL}/groups/1`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(202);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          // res.body.data.should.be.a('array');
          res.body.status.should.equal(202);
          done();
        });
    });


    it('should add users to a particular group', (done) => {
      const data = {
        emails: ['john@doe.com'],
      };
      chai.request(server)
        .post(`${apiURL}/groups/1/users`)
        .send(data)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          if (res.body.status === 200) {
            res.should.have.status(200);
            should.exist(res.body);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            // res.body.data.should.be.a('array');
            res.body.status.should.equal(200);
          } else {
            res.should.have.status(400);
            should.exist(res.body);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            // res.body.data.should.be.a('array');
            res.body.status.should.equal(400);
          }
          done();
        });
    });

    it('should send a bulk message to all the members in the group', (done) => {
      const data = {
        subject: 'something amazing',
        message: 'there would be group meeting',
        status: 'sent',
      };
      chai.request(server)
        .post(`${apiURL}/groups/1/messages`)
        .send(data)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          if (res.body.status === 201) {
            res.should.have.status(201);
            should.exist(res.body);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            // res.body.data.should.be.a('array');
            res.body.status.should.equal(201);
          } else {
            res.should.have.status(400);
            should.exist(res.body);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            // res.body.data.should.be.a('array');
            res.body.status.should.equal(400);
          }
          done();
        });
    });

    it('should delete a memeber from your group', (done) => {
      chai.request(server)
        .delete(`${apiURL}/groups/1/users/1`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          if (res.body.status === 202) {
            res.should.have.status(202);
            should.exist(res.body);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            // res.body.data.should.be.a('array');
            res.body.status.should.equal(202);
          } else {
            res.should.have.status(403);
            should.exist(res.body);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            // res.body.data.should.be.a('array');
            res.body.status.should.equal(403);
          }
          done();
        });
    });
  });
});
