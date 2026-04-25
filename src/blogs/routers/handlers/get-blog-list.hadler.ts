import { HttpStatus } from '../../../core/types/http-statuses';
import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';

export async function getBlogsListHandler(req: Request, res: Response) {
  try {
    const blogs = await blogsRepository.findAll();
    res.status(HttpStatus.Ok).send(blogs);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
