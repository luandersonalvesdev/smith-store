import ProductModel, { 
  ProductInputtableTypes, ProductSequelizeModel, 
} from '../database/models/product.model';
import { ProductCreated } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import productSchema from '../validation/productSchema';

const validateProduct = (newProduct: ProductInputtableTypes): string => {
  const { error } = productSchema.validate(newProduct);
  console.log(error?.details[0].type);
  return error ? error.message : '';
};

async function create(newProduct: ProductInputtableTypes):Promise<ServiceResponse<ProductCreated>> {
  const validProduct = validateProduct(newProduct);
  if (validProduct) {
    const [status, message] = validProduct.split('|');
    return { status: Number(status), data: { message } };
  }

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