import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import OrderModel from '../../../src/database/models/order.model';
import orderMock from '../../mocks/order.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('show all orders with product id', async function () {
        // ARRANGE
        const orderBuilded = OrderModel.build(orderMock.oneOrder);
        sinon.stub(OrderModel, 'findAll').resolves([orderBuilded]);
    
        // ACT
        const response = await chai.request(app).get('/orders');
    
        // ASSERT
        expect(response.status).to.be.equal(200); 
        expect(Array.isArray(response.body)).to.be.equal(true); 
  });
});
