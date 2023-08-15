import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function getAll(req: Request, res: Response) {
  const { status, data } = await orderService.getAll();

  res.status(status).json(data);
}

async function create(req: Request, res: Response) {
  const { status, data } = await orderService.create(req.body);
  res.status(status).json(data);
}

export default {
  getAll,
  create,
};