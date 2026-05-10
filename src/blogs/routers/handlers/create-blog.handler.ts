import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../../mappers/map-to-blog-view-model.util';
import { blogsService } from '../../application/blogs.service';
import { BlogCreateInput } from '../input/blog-create.input';

export async function createBlogHandler(
  req: Request<{}, {}, BlogCreateInput>,
  res: Response,
) {
  try {
    const createdBlogId = await blogsService.createBlog(
      req.body.data.attributes,
    );
    const createBlog = await blogsService.findByIdOrFail(createdBlogId);
    const blogViewModel = mapToBlogViewModel(createBlog);
    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
