import { Request, Response } from 'express';
import loginService from '../services/login.service';

async function doLogin(req: Request, res: Response) {
  const { status, data } = await loginService.doLogin(req.body);
  return res.status(status).json(data);
}

export default {
  doLogin,
};