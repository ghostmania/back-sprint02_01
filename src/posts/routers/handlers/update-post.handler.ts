import { HttpStatus } from '../../../core/types/http-statuses';
import { Request, Response } from 'express';
import { PostInputDto } from '../../dto/post.input-dto';
import { postsService } from '../../application/posts.service';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response,
) {
  try {
    await postsService.update(req.params.id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
