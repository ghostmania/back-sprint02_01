import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Post } from '../../types/post';
import { PostInputDto } from '../../dto/post.input-dto';
import { postsRepository } from '../../repositories/posts.repository';
import { mapToPostViewModel } from '../../mappers/map-to-post-view-model.util';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';

export async function createPostHandler(
  req: Request<{}, {}, PostInputDto>,
  res: Response,
) {
  try {
    let existingBlog = await blogsRepository.findById(req.body.blogId);
    if (!existingBlog) {
      res.sendStatus(HttpStatus.InternalServerError);
    }

    const newDriver: Post = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: req.body.blogId,
      blogName: existingBlog?.name ?? '',
      id: req.body.title,
      createdAt: new Date().toString(),
    };

    const createdPost = await postsRepository.create(newDriver);
    const postViewModel = mapToPostViewModel(createdPost);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
