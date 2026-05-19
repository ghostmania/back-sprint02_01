import { LoginAttributes } from '../dto/login.attributes';
import { authRepository } from '../repositories/auth.repository';

export const authService = {
  async login(dto: LoginAttributes) {
    return await authRepository.login(dto);
  },
};
