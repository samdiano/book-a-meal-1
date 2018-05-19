import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import { login as loginData } from '../../utils/data';

const { existingUser, nonExistingUser, wrongData } = loginData;

describe('Signin Routes', () => {
  it('signs in a user into the app and returns user + token', (done) => {
    request.agent(app)
      .post('/api/v1/auth/signin')
      .send(existingUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('token');
        expect(res.body.user.firstname).to.equal('Iveren');
        expect(res.body.user.email).to.equal('iveren@shaguy.com');

        if (err) return done(err);
        done();
      });
  });

  it('signs in a caterer into the app and returns user + token', (done) => {
    request.agent(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'belly@fill.com', password: 'bellyfill' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('token');
        expect(res.body.user.businessName).to.equal('BellyFill');
        expect(res.body.user.email).to.equal('belly@fill.com');

        if (err) return done(err);
        done();
      });
  });

  it('doesn\'t signin a user that does not exist', (done) => {
    request.agent(app)
      .post('/api/v1/auth/signin')
      .send(nonExistingUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Credentials');

        if (err) return done(err);
        done();
      });
  });

  it('doesn\'t signin an user existing user with a wrong password', (done) => {
    request.agent(app)
      .post('/api/v1/auth/signin')
      .send({ ...existingUser, password: 'kowo' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Invalid Credentials');

        if (err) return done(err);
        done();
      });
  });

  it('returns validation errors for wrong input', (done) => {
    request.agent(app)
      .post('/api/v1/auth/signin')
      .send(wrongData)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.email.msg).to.equal('Email is invalid');
        expect(res.body.errors.password.msg).to.equal('Password must be specified');

        if (err) return done(err);
        done();
      });
  });
});
