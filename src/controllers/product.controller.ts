import { Request, Response } from 'express';
import productService from '../services/product.service';

async function create(req: Request, res: Response) {
  const newProduct = req.body;
  const { status, data } = await productService.create(newProduct);

  res.status(status).json(data);
}

export default {
  create,
};