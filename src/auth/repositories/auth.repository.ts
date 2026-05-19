import { LoginAttributes } from '../dto/login.attributes';

export const authRepository = {
  async login(loginData: LoginAttributes) {
    // check user meail  in db
    return 'ok';
  },
};
