import { HttpStatus } from '../../../core/types/http-statuses';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { BlogQueryInput } from '../input/blog-query.input';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { blogsService } from '../../application/blogs.service';
import { mapToDriverListPaginatedOutput } from '../mappers/map-to-blog-list-paginated-output.util';

export async function getBlogsListHandler(req: Request, res: Response) {
  try {
    const sanitizedQuery = matchedData<BlogQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });
    //утилита для извечения трансформированных значений после валидатара
    //в req.query остаются сырые квери параметры (строки)
    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

    const { items, totalCount } = await blogsService.findMany(queryInput);

    const driversListOutput = mapToDriverListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.send(driversListOutput);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
