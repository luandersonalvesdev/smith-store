import { Router } from 'express';
import orderController from '../controllers/order.controller';
import validateLoginMiddleware from '../middlewares/validateLogin';

const orderRouter = Router();

orderRouter.get('/', orderController.getAll);
orderRouter.post('/', validateLoginMiddleware, orderController.create);

export default orderRouter;