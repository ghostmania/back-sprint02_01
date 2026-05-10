import { WithId } from 'mongodb';
import { ResourceType } from '../../../core/types/resource-type';
import { Blog } from '../../types/blog';
import { BlogDataOutput } from '../output/blog-data.output';
import { BlogListPaginatedOutput } from '../output/blog-list-paginated.output';

export function mapToDriverListPaginatedOutput(
  blogs: WithId<Blog>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): BlogListPaginatedOutput {
  return {
    meta: {
      page: meta.pageNumber,
      pageSize: meta.pageSize,
      pageCount: Math.ceil(meta.totalCount / meta.pageSize),
      totalCount: meta.totalCount,
    },
    data: blogs.map(
      (blog): BlogDataOutput => ({
        type: ResourceType.Blogs,
        id: blog._id.toString(),
        attributes: {
          name: blog.name,
          description: blog.description,
          websiteUrl: blog.websiteUrl,
          isMembership: blog.isMembership,
          createdAt: blog.createdAt,
        },
      }),
    ),
  };
}
