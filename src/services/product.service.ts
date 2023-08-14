import ProductModel, { 
  ProductInputtableTypes, ProductSequelizeModel, 
} from '../database/models/product.model';
import { ProductCreated } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function create(newProduct: ProductInputtableTypes):Promise<ServiceResponse<ProductCreated>> {
  const response = await ProductModel.create(newProduct);
  const { orderId, ...data } = response.dataValues;
  
  return { status: 201, data };
}

async function getAll(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const response = await ProductModel.findAll();
  
  return { status: 200, data: response };
}

export default {
  create,
  getAll,
};