import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { LoginData, Token } from '../types/Login';
import authLogin from '../utils/authLogin';
import loginSchema from '../validation/loginSchema';

const validateData = (userData: LoginData): string => {
  const { error } = loginSchema.validate(userData);

  if (error) {
    return error.message;
  }
  return 'false';
};

async function doLogin(userData: LoginData): Promise<ServiceResponse<Token>> {
  const validate = validateData(userData);
  if (validate !== 'false') {
    return { status: 400, data: { message: validate } };
  }

  const user = await UserModel.findOne({ where: { username: userData.username } });
  
  if (!user || !bcrypt.compareSync(userData.password, user.dataValues.password)) {
    return { status: 401, data: { message: 'Username or password invalid' } };
  }

  const { password, ...data } = user.dataValues;

  const token = authLogin.createToken(data);
  
  return { status: 200, data: { token } };
}

export default {
  doLogin,
};