import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const should = chai.should();

chai.use(chaiHttp);

let accessToken;

const { apiURL } = global;

describe('Message ', () => {
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

  describe('/Post /messages', () => {
    it('user should be able to create or send email', (done) => {
      const data = {
        subject: 'awesome subject',
        message: 'thank God i am awesome',
        status: 'draft',
        contactEmail: 'paul@taru.com',
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
  });

  describe('/GET /messages', () => {
    it('user should be able to get all received emails as inbox', (done) => {
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

  describe('/GET /messages/unread', () => {
    it('user should be able to get all unread messages', (done) => {
      chai.request(server)
        .get(`${apiURL}/messages/unread`)
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


  describe('/GET /messages/:id', () => {
    it('user should be able to get a specific user email from the inbox', (done) => {
      chai.request(server)
        .get(`${apiURL}/messages/:id`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          if (res.body.status === 200) {
            res.should.have.status(200);
            should.exist(res.body);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.status.should.equal(200);
          } else {
            res.should.have.status(404);
            should.exist(res.body);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.status.should.equal(404);
          }
          done();
        });
    });
  });

  describe('/DELETE /messages/:id', () => {
    it('user should be able to delete a message from there inbox', (done) => {
      chai.request(server)
        .delete(`${apiURL}/messages/1`)
        .set('x-access-token', accessToken)
        .end((err, res) => {
          res.should.have.status(202);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(202);
          done(err);
        });
    });
  });

  describe('/GET /messages/sent', () => {
    it('user should be able to get all sent messages ', (done) => {
      chai.request(server)
        .get(`${apiURL}/messages/sent`)
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
