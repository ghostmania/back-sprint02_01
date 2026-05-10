import { Request, Response } from 'express';
import { postsService } from '../../../posts/application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { PostInputDto } from '../../../posts/dto/post.input-dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToPostViewModel } from '../../../posts/mappers/map-to-post-view-model.util';

export async function createBlogForPostHandler(
  req: Request<{ id: string }, {}, Omit<PostInputDto, 'blogId'>>,
  res: Response,
) {
  try {
    const blogId = req.params.id;
    const createdPostId = await postsService.createPost({ ...req.body, blogId });
    const postFromDb = await postsService.findByIdOrFail(createdPostId);
    res.status(HttpStatus.Created).send(mapToPostViewModel(postFromDb));
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
