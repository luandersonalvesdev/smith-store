import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'secret';

const jwtConfig: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '2w' };

type TokenPayload = {
  username: string;
};

const createToken = (payload: TokenPayload): string => jwt.sign(payload, secretKey, jwtConfig);

const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decodedToken = jwt.verify(token, secretKey) as TokenPayload;
    return decodedToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  createToken,
  verifyToken,
};