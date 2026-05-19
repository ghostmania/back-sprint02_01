import { LoginAttributes } from '../dto/login.attributes';
import { usersRepository } from '../../users/repositories/users.repository';
import { bcryptService } from '../adapters/bcrypt.service';

export const authService = {
  async login(dto: LoginAttributes): Promise<boolean> {
    const user = await usersRepository.findByLoginOrEmail(dto.loginOrEmail);
    if (!user) return false;
    return bcryptService.compare(dto.password, user.passwordHash);
  },
};
