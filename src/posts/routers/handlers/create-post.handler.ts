import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostInputDto } from '../../dto/post.input-dto';
import { postsService } from '../../application/posts.service';
import { mapToPostViewModel } from '../../mappers/map-to-post-view-model.util';

export async function createPostHandler(
  req: Request<{}, {}, PostInputDto>,
  res: Response,
) {
  try {
    const createdPostId = await postsService.createPost(req.body);
    const createdPost = await postsService.findByIdOrFail(createdPostId);
    res.status(HttpStatus.Created).send(mapToPostViewModel(createdPost));
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
