import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { UsersQueryInput } from '../input/users-query.input';
import { usersService } from '../../application/users.service';
import { mapToUserListPaginatedOutput } from '../mappers/map-to-users-list-paginated-output.util';

export async function getUsersListHandler(req: Request, res: Response) {
  try {
    const sanitizedQuery = matchedData<UsersQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });
    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);
    const { users, totalCount } = await usersService.findMany(queryInput);

    res.send(
      mapToUserListPaginatedOutput(users, {
        pageNumber: queryInput.pageNumber,
        pageSize: queryInput.pageSize,
        totalCount,
      }),
    );
  } catch (error) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
