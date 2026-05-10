import { WithId } from 'mongodb';
import { Post } from '../../../posts/types/post';
import { mapToPostViewModel } from '../../../posts/mappers/map-to-post-view-model.util';

export function mapToPostListPaginatedOutput(
  posts: WithId<Post>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
) {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: posts.map(mapToPostViewModel),
  };
}
