import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import sequelize from '../database/models/index';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

async function getAll(): Promise<ServiceResponse<OrderSequelizeModel[]>> {
  const response = await OrderModel.findAll({
    include: [
      { model: ProductModel, as: 'productIds', attributes: [] },
    ],
    attributes: [
      'id', 
      'userId', 
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],
    ],
    group: ['Order.id'],
    raw: true,
  });

  return { status: 200, data: response };
}

export default {
  getAll,
};