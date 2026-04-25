import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { BlogInputDto } from '../../dto/blog.input-dto';
import { blogsRepository } from '../../repositories/blogs.repository';
import { Blog } from '../../types/blog';

export async function createBlogHandler(
  req: Request<{}, {}, BlogInputDto>,
  res: Response,
) {
  try {
    const newBlog: Blog = {
      id: req.body.name,
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
      isMembership: false,
      createdAt: new Date().toString(),
    };

    const createdBlog = await blogsRepository.create(newBlog);
    res.status(HttpStatus.Created).send(createdBlog);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
