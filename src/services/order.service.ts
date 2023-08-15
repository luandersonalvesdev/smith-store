import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import sequelize from '../database/models/index';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { NewOrder } from '../types/Order';
import UserModel from '../database/models/user.model';
import orderSchema from '../validation/orderSchema';

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

function validateOrder(newOrder: NewOrder): string {
  const { error } = orderSchema.validate(newOrder);
  return error ? error.message : '';
}

async function doingTransaction(newOrder: NewOrder): Promise<boolean> {
  const responseTransaction = await sequelize.transaction(async (transaction) => {
    const existingUser = await UserModel.findOne({ where: { id: newOrder.userId }, transaction });
    if (!existingUser) return false;

    const dataOrder = await OrderModel.create(newOrder, { transaction });

    const promises = newOrder.productIds.map(async (productId: number) => {
      await ProductModel.update(
        { orderId: dataOrder.dataValues.id },
        { where: { id: productId }, transaction },
      );
    });
    await Promise.all(promises);
    return true;
  });
  return responseTransaction;
}

async function create(newOrder: NewOrder): Promise<ServiceResponse<NewOrder>> {
  const validate = validateOrder(newOrder);
  if (validate) {
    const [status, data] = validate.split('|');
    return { status: Number(status), data: { message: data } };
  }
  const responseTransaction = await doingTransaction(newOrder);
  if (!responseTransaction) return { status: 404, data: { message: '"userId" not found' } };

  return { status: 201, data: newOrder };
}

export default {
  getAll,
  create,
};