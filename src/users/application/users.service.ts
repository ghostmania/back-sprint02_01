import { ObjectId, WithId } from 'mongodb';
import { UsersQueryInput } from '../routers/input/users-query.input';
import { User } from '../types/user';
import { usersRepository } from '../repositories/users.repository';
import { UserAttributes } from '../dto/user.attributes';
import { usersCollection } from '../../db/mongo.db';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';
import { HttpStatus } from '../../core/types/http-statuses';
import { DomainError } from '../../core/errors/domain.error';
import { bcryptService } from '../../auth/adapters/bcrypt.service';

export const usersService = {
  async findMany(
    queryDto: UsersQueryInput,
  ): Promise<{ users: WithId<User>[]; totalCount: number }> {
    return usersRepository.findMany(queryDto);
  },
  async createUser(dto: UserAttributes): Promise<string> {
    const passwordHash = await bcryptService.generateHash(dto.password);
    const newUser: User = {
      login: dto.login,
      email: dto.email,
      passwordHash,
      createdAt: new Date(),
    };
    return usersRepository.create(newUser);
  },
  async findByIdOrFail(id: string): Promise<WithId<User>> {
    const res = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError('User not found');
    }
    return res;
  },
  async delete(id: string): Promise<void> {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new DomainError(`User not found`, HttpStatus.NotFound);
    }

    await usersRepository.delete(id);
    return;
  },
};
