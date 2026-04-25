import { HttpStatus } from '../../../core/types/http-statuses';
import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { mapToPostViewModel } from '../../mappers/map-to-post-view-model.util';

export async function getPostsListHandler(req: Request, res: Response) {
  try {
    const drivers = await postsRepository.findAll();
    const postViewModel = drivers.map(mapToPostViewModel);
    res.send(postViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
