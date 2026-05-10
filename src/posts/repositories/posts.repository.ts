import { postsCollection } from '../../db/mongo.db';
import { ObjectId, WithId } from 'mongodb';
import { Post } from '../types/post';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';

export const postsRepository = {
  async findAll(): Promise<WithId<Omit<Post, 'id'>>[]> {
    return postsCollection.find().toArray();
  },

  async findById(id: string): Promise<WithId<Omit<Post, 'id'>> | null> {
    return postsCollection.findOne({ _id: new ObjectId(id) });
  },

  async findByIdOrFail(id: string): Promise<WithId<Omit<Post, 'id'>>> {
    const res = await postsCollection.findOne({ _id: new ObjectId(id) });
    if (!res) {
      throw new RepositoryNotFoundError('Post not exist');
    }
    return res;
  },

  async create(newPost: Omit<Post, 'id'>): Promise<string> {
    const insertResult = await postsCollection.insertOne(newPost);
    return insertResult.insertedId.toString();
  },

  async update(id: string, dto: Omit<Post, 'id' | 'createdAt'>): Promise<void> {
    const updateResult = await postsCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          blogId: dto.blogId,
          blogName: dto.blogName,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error('Post not exist');
    }
    return;
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await postsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error('Post not exist');
    }
    return;
  },
};
