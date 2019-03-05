import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const should = chai.should();

chai.use(chaiHttp);

const { apiURL } = global;

describe('Message ', () => {
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
        .end((err, res) => {
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

  describe('/GET /messages', () => {
    it('user should be able to get all received emails as inbox', (done) => {
      chai.request(server)
        .get(`${apiURL}/messages`)
        .end((err, res) => {
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

  describe('/GET /messages/unread', () => {
    it('user should be able to get all unread messages', (done) => {
      chai.request(server)
        .get(`${apiURL}/messages/unread`)
        .end((err, res) => {
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
