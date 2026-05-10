import { WithId } from 'mongodb';
import { PostInputDto } from '../dto/post.input-dto';
import { postsRepository } from '../repositories/posts.repository';
import { blogsRepository } from '../../blogs/repositories/blogs.repository';
import { Post } from '../types/post';
import { DomainError } from '../../core/errors/domain.error';
import { HttpStatus } from '../../core/types/http-statuses';

export const postsService = {
  async createPost(dto: PostInputDto): Promise<string> {
    const blog = await blogsRepository.findById(dto.blogId);
    if (!blog) {
      throw new DomainError('Blog not found', HttpStatus.BadRequest);
    }

    const newPost: Omit<Post, 'id'> = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      blogName: blog.name,
      createdAt: new Date(),
    };

    return postsRepository.create(newPost);
  },

  async findByIdOrFail(id: string): Promise<WithId<Omit<Post, 'id'>>> {
    return postsRepository.findByIdOrFail(id);
  },

  async update(id: string, dto: PostInputDto): Promise<void> {
    const blog = await blogsRepository.findById(dto.blogId);
    if (!blog) {
      throw new DomainError('Blog not found', HttpStatus.BadRequest);
    }

    await postsRepository.update(id, {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      blogName: blog.name,
    });
  },

  async delete(id: string): Promise<void> {
    const post = await postsRepository.findById(id);
    if (!post) {
      throw new DomainError('Post not found', HttpStatus.NotFound);
    }
    await postsRepository.delete(id);
  },

  async findAll(): Promise<WithId<Omit<Post, 'id'>>[]> {
    return postsRepository.findAll();
  },
};
