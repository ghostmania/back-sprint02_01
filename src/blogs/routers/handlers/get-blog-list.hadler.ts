import { HttpStatus } from '../../../core/types/http-statuses';
import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';
import { mapToBlogViewModel } from '../../mappers/map-to-blog-view-model.util';

export async function getBlogsListHandler(req: Request, res: Response) {
  try {
    const blogs = await blogsRepository.findAll();
    const blogsViewModels = blogs.map(mapToBlogViewModel);
    res.send(blogsViewModels);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
