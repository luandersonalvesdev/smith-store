import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';
import orderMock from '../../mocks/order.mock';
import login from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import loginService from '../../../src/services/login.service';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);

describe('POST /orders', function () {
  let token: '123' ;
  beforeEach(function () {
    sinon.restore();
    sinon.stub(jwt, 'verify').resolves('123');
  });

  it('can create a order.', async function() {
    // ARRANGE
    const newOrder = orderMock.newOrder;
    const mockOneUser = UserModel.build(login.existingUser);
    const mockNewOrderCreated = OrderModel.build(orderMock.newOrderCreated);

    sinon.stub(UserModel, 'findOne').resolves(mockOneUser);
    sinon.stub(OrderModel, 'create').resolves(mockNewOrderCreated);
    sinon.stub(ProductModel, 'update').resolves();

    // ACT
    const response = await chai.request(app).post('/orders').send(newOrder).set('Authorization', `Bearer ${token}`);

    // // ASSERT
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(newOrder);
  });

  it("can't create a order without userId.", async function() {
    // ARRANGE
    const newOrder = orderMock.invalidNewOrder;

    // ACT
    const response = await chai.request(app).post('/orders').send(newOrder).set('Authorization', `Bearer ${token}`);

    // // ASSERT
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('"userId" is required');
  });

  it("can't create a order with invalid userId.", async function() {
    // ARRANGE
    const newOrder = orderMock.notFoundUserIdNewOrder;

    sinon.stub(UserModel, 'findOne').resolves(null);

    // ACT
    const response = await chai.request(app).post('/orders').send(newOrder).set('Authorization', `Bearer ${token}`);

    // // ASSERT
    expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.equal('"userId" not found');
  });
});
