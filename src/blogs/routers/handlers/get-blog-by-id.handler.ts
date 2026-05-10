import { HttpStatus } from '../../../core/types/http-statuses';
import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';
import { mapToBlogOutput } from '../../mappers/map-to-blog-output.util';

export async function getBlogByIdHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const blog = await blogsRepository.findByIdOrFail(id);

    const blogViewModel = mapToBlogOutput(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
