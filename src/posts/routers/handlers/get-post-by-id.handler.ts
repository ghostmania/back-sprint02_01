import { HttpStatus } from '../../../core/types/http-statuses';
import { Request, Response } from 'express';
import { postsService } from '../../application/posts.service';
import { mapToPostViewModel } from '../../mappers/map-to-post-view-model.util';

export async function getPostByIdHandler(req: Request, res: Response) {
  try {
    const post = await postsService.findByIdOrFail(req.params.id + '');
    res.status(HttpStatus.Ok).send(mapToPostViewModel(post));
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
