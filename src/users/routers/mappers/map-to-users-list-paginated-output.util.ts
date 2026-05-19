import { WithId } from 'mongodb';
import { User } from '../../types/user';
import { mapToUserViewModel } from './map-to-user-view-model.util';

export function mapToUserListPaginatedOutput(
  users: WithId<User>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
) {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    users: users.map(mapToUserViewModel),
  };
}
