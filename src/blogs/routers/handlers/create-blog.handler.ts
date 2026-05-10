import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';
import { BlogAttributes } from '../../dto/blog.attributes';
import { mapToBlogOutput } from '../../mappers/map-to-blog-output.util';

export async function createBlogHandler(
  req: Request<{}, {}, BlogAttributes>,
  res: Response,
) {
  try {
    const createdBlogId = await blogsService.createBlog(req.body);
    console.log('id', createdBlogId);
    const createBlog = await blogsService.findByIdOrFail(createdBlogId);
    const blogViewModel = mapToBlogOutput(createBlog);
    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
