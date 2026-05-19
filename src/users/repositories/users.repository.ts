import { ObjectId, WithId } from 'mongodb';
import { UsersQueryInput } from '../routers/input/users-query.input';
import { User } from '../types/user';
import { usersCollection } from '../../db/mongo.db';

export const usersRepository = {
  async findById(id: string): Promise<WithId<Omit<User, 'id'>> | null> {
    return usersCollection.findOne({ _id: new ObjectId(id) });
  },
  async findMany(
    queryDto: UsersQueryInput,
  ): Promise<{ users: WithId<User>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }

    const users = await usersCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await usersCollection.countDocuments(filter);

    return { users, totalCount };
  },
  async create(newBlog: User): Promise<string> {
    const insertResult = await usersCollection.insertOne(newBlog);
    return insertResult.insertedId.toString();
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error('Blog not exist');
    }
  },
};
