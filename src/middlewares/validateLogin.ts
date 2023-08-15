import { NextFunction, Request, Response } from 'express';
import authLogin from '../utils/authLogin';

const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  const [, trueToken] = token.split(' ');

  const payload = authLogin.verifyToken(trueToken);

  if (!payload) return res.status(401).json({ message: 'Invalid token' });
  
  next();
};

export default validateLoginMiddleware;