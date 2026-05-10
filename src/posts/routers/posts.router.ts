import { Router } from 'express';
import { getPostByIdHandler } from './handlers/get-post-by-id.handler';
import { getPostsListHandler } from './handlers/get-post-list.hadler';
import { updatePostHandler } from './handlers/update-post.handler';
import { createPostHandler } from './handlers/create-post.handler';
import { deletePostHandler } from './handlers/delete-post.handler';
import { superAdminGuardMiddleware } from '../../auth/admin.guard-middleware';
import { DocumentExistGuardMiddleware } from '../middleware/DocumentExistGuardMiddleware';
import { PostHasValidFIeldsMiddleware } from '../middleware/PostHasValidFieldsMiddleware';
import { paginationAndSortingValidation } from '../../core/middleware/validation/query-pagination-sorting.validation-middleware';
import { PostSortField } from './input/post-sort-field';
import { inputValidationResultMiddleware } from '../../core/middleware/validation/input-validtion-result.middleware';

export const postsRouter = Router({});

postsRouter
  .get(
    '',
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    getPostsListHandler,
  )

  .get('/:id', DocumentExistGuardMiddleware, getPostByIdHandler)
  .post(
    '',
    superAdminGuardMiddleware,
    PostHasValidFIeldsMiddleware,
    createPostHandler,
  )

  .put(
    '/:id',
    superAdminGuardMiddleware,
    DocumentExistGuardMiddleware,
    PostHasValidFIeldsMiddleware,
    updatePostHandler,
  )

  .delete(
    '/:id',
    superAdminGuardMiddleware,
    DocumentExistGuardMiddleware,
    deletePostHandler,
  );
