import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import { createAllTables, dropAllTables } from '../model/index';

const should = chai.should();

chai.use(chaiHttp);

const { apiURL } = global;

describe.skip('Message ', () => {
  before(() => {
    createAllTables();
  });

  after(() => {
    dropAllTables();
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

  describe('/DELETE /messages/:id', () => {
    it('user should be able to delete a message from there inbox', (done) => {
      chai.request(server)
        .delete(`${apiURL}/messages/:id`)
        .end((err, res) => {
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

  describe('/GET /messages/:id', () => {
    it('user should be able to get a specific user email from the inbox', (done) => {
      chai.request(server)
        .get(`${apiURL}/messages/:id`)
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

  describe('/GET /messages/sent', () => {
    it('user should be able to get all sent messages ', (done) => {
      chai.request(server)
        .get(`${apiURL}/messages/sent`)
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
