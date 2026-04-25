import { Router, Request, Response } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { blogsCollection, postsCollection } from '../../db/mongo.db';
import { db as blogsDb } from '../../db/blogs.db';
import { db as postsDb } from '../../db/posts.db';

export const testingRouter = Router({});

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
  await blogsCollection.deleteMany({});
  await postsCollection.deleteMany({});
  blogsDb.blogs = [];
  postsDb.posts = [];
  res.sendStatus(HttpStatus.NoContent);
});
