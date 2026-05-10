import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { postsService } from '../../../posts/application/posts.service';
import { PostQueryInput } from '../../../posts/routers/input/post-query.input';
import { PostSortField } from '../../../posts/routers/input/post-sort-field';
import { mapToPostListPaginatedOutput } from '../mappers/map-to-post-list-paginated-output.util';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';

export async function getBlogPostListHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const blogId = req.params.id;
    const sanitizedQuery = matchedData<PostQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });
    const queryInput = setDefaultSortAndPaginationIfNotExist<PostSortField>(sanitizedQuery);

    const { items, totalCount } = await postsService.findPostsForBlog(
      queryInput,
      blogId,
    );

    res.send(
      mapToPostListPaginatedOutput(items, {
        pageNumber: queryInput.pageNumber,
        pageSize: queryInput.pageSize,
        totalCount,
      }),
    );
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
