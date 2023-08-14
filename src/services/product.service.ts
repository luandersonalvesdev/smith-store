import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { ProductCreated } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function create(newProduct: ProductInputtableTypes):Promise<ServiceResponse<ProductCreated>> {
  const response = await ProductModel.create(newProduct);
  const { orderId, ...data } = response.dataValues;
  
  return { status: 201, data };
}

export default {
  create,
};