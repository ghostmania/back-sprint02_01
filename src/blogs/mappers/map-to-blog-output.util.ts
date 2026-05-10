import { WithId } from 'mongodb';
import { BlogOutput } from '../routers/output/blog.output';
import { ResourceType } from '../../core/types/resource-type';
import { Blog } from '../types/blog';

export function mapToBlogOutput(blog: WithId<Blog>): BlogOutput {
  return {
    data: {
      type: ResourceType.Blogs,
      id: blog._id.toString(),
      attributes: {
        name: blog.name,
        websiteUrl: blog.websiteUrl,
        description: blog.description,
        isMembership: blog.isMembership,
        createdAt: blog.createdAt,
      },
    },
  };
}
