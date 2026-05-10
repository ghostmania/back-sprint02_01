import { HttpStatus } from '../../../core/types/http-statuses';
import { Request, Response } from 'express';
import { postsService } from '../../application/posts.service';
import { mapToPostViewModel } from '../../mappers/map-to-post-view-model.util';

export async function getPostsListHandler(req: Request, res: Response) {
  try {
    const posts = await postsService.findAll();
    res.send(posts.map(mapToPostViewModel));
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
