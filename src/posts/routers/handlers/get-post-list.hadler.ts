import { HttpStatus } from '../../../core/types/http-statuses';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { postsService } from '../../application/posts.service';
import { PostQueryInput } from '../input/post-query.input';
import { PostSortField } from '../input/post-sort-field';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { mapToPostListPaginatedOutput } from '../../../blogs/routers/mappers/map-to-post-list-paginated-output.util';

export async function getPostsListHandler(req: Request, res: Response) {
  try {
    const sanitizedQuery = matchedData<PostQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });
    const queryInput = setDefaultSortAndPaginationIfNotExist<PostSortField>(sanitizedQuery);
    const { items, totalCount } = await postsService.findMany(queryInput);

    res.send(
      mapToPostListPaginatedOutput(items, {
        pageNumber: queryInput.pageNumber,
        pageSize: queryInput.pageSize,
        totalCount,
      }),
    );
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
