import { WithId } from 'mongodb';
import { Blog } from '../../types/blog';
import { mapToBlogViewModel } from '../../mappers/map-to-blog-view-model.util';

export function mapToBlogListPaginatedOutput(
  blogs: WithId<Blog>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
) {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: blogs.map(mapToBlogViewModel),
  };
}
