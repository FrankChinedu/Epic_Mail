import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const should = chai.should();

chai.use(chaiHttp);

const { apiURL } = global;

describe(' Sign up', () => {
  describe('sign up', () => {
    it('should create an account for a new user 89', (done) => {
      const data = {
        firstname: 'frank',
        lastname: 'angelo',
        email: 'fangelo@me.com',
        password: '12345678',
      };
      chai.request(server)
        .post(`${apiURL}/auth/signup`)
        .send(data)
        .end((err, res) => {
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

  describe('sign up', () => {
    it('should create an account for a new user ', (done) => {
      const data = {
        firstname: 'john',
        lastname: 'doe',
        email: 'johlongn@doe.com',
        password: '12345678',
      };
      chai.request(server)
        .post(`${apiURL}/auth/signup`)
        .send(data)
        .end((err, res) => {
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

  // describe('/Post auth/signup', () => {
  //   it('should not be able to sign up a new user if email parameter is missing ', (done) => {
  //     const data = {
  //       firstname: 'frank',
  //       lastname: 'angelo',
  //       email: '',
  //       password: '12345678',
  //     };
  //     chai.request(server)
  //       .post(`${apiURL}/auth/signup`)
  //       .send(data)
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //       });
  //     done();
  //   });
  // });

  describe('/Post auth/signup', () => {
    it('should not be able to sign up a new user if password parameter is missing ', (done) => {
      const data = {
        firstname: 'frank',
        lastname: 'angelo',
        email: 'angelo@me.com',
        password: '',
      };
      chai.request(server)
        .post(`${apiURL}/auth/signup`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
        });
      done();
    });
  });

  describe('/Post auth/signup', () => {
    it('should not be able to sign up a new user if first name parameter is missing', (done) => {
      const data = {
        firstname: '',
        lastname: 'angelo',
        email: 'angelo@me.com',
        password: '12345678',
      };
      chai.request(server)
        .post(`${apiURL}/auth/signup`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
        });
      done();
    });
  });

  describe('/Post auth/signup', () => {
    it('should not be able to sign up a new user if no parameter is missing', (done) => {
      const data = {
      };
      chai.request(server)
        .post(`${apiURL}/auth/signup`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(500);
          should.exist(res.body);
          res.body.should.be.a('object');
          // res.body.should.have.property('error');
        });
      done();
    });
  });

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

    it('should not be able to log a user in if wrong parameters are passed', (done) => {
      const data = {
        email: 'franki@me.com',
        password: '123456789',
      };
      chai.request(server)
        .post(`${apiURL}/auth/login`)
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
        });
      done();
    });
  });
});
