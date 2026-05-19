import { LoginAttributes } from '../dto/login.attributes';

export const authRepository = {
  async login(loginData: LoginAttributes) {
    // check user in db
    return 'ok';
  },
};
