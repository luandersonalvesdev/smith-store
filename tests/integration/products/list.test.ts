import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('show all products from db', async function() {
    // // ARRANGE
    const productBuilded = ProductModel.build(productMock.newProductCreatedReturn);
    sinon.stub(ProductModel, 'findAll').resolves([productBuilded, productBuilded]);

    // // ACT
    const response = await chai.request(app).get('/products');

    // // ASSERT
    expect(response.status).to.be.equal(200); 
    expect(Array.isArray(response.body)).to.be.equal(true); 
  });
});
