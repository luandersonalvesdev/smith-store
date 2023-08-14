import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';
import bcrypt from 'bcryptjs';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('doing login successful and return a token', async function() {
    // Arrange
    const requestBody = loginMock.validLogin;
    const mockFindOneReturn = UserModel.build(loginMock.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    // Act
    const response = await chai.request(app).post('/login').send(requestBody);

    // Assert
    expect(response.status).to.equal(200);
    expect(response.body).to.have.key('token');
  });

  it('doing login without password', async function() {
    // Arrange
    const requestBody = loginMock.loginWithoutPassword;

    // Act
    const response = await chai.request(app).post('/login').send(requestBody);

    // Assert
    expect(response.status).to.equal(400);
    expect(response.body).to.have.key('message');
    expect(response.body.message).to.be.equal('"username" and "password" are required');
  });

  it('doing login with wrong password', async function() {
    // Arrange
    const requestBody = loginMock.invalidLogin;

    // Act
    const response = await chai.request(app).post('/login').send(requestBody);

    // Assert
    expect(response.status).to.equal(401);
    expect(response.body).to.have.key('message');
    expect(response.body.message).to.be.equal('Username or password invalid');
  });
});
