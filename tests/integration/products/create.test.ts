import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('que é possível criar um produto.', async function() {
    // ARRANGE
    const newProduct = productMock.newProductCreated;
    const mockNewProductCreated = ProductModel.build(productMock.newProductCreatedReturn);
    sinon.stub(ProductModel, 'create').resolves(mockNewProductCreated);

    // ACT
    const response = await chai.request(app).post('/products').send(newProduct);

    // ASSERT
    expect(response.status).to.be.equal(201);    
    expect(response.body).to.haveOwnProperty('id');
    expect(response.body).to.haveOwnProperty('name');
    expect(response.body).to.haveOwnProperty('price');
  });
});
