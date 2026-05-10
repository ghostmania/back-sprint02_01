import { WithId } from 'mongodb';
import { BlogAttributes } from '../dto/blog.attributes';
import { blogsRepository } from '../repositories/blogs.repository';
import { Blog } from '../types/blog';
import { DomainError } from '../../core/errors/domain.error';
import { HttpStatus } from '../../core/types/http-statuses';

export const blogsService = {
  async createBlog(dto: BlogAttributes) {
    const newBlog: Omit<Blog, 'id'> = {
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
      isMembership: false,
      createdAt: new Date().toISOString(),
    };
    return await blogsRepository.create(newBlog);
  },
  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    return blogsRepository.findByIdOrFail(id);
  },
  async delete(id: string): Promise<void> {
    const blog = await blogsRepository.findById(id);

    if (!blog) {
      throw new DomainError(`Blog not found`, HttpStatus.NotFound);
    }

    await blogsRepository.delete(id);
    return;
  },
};
