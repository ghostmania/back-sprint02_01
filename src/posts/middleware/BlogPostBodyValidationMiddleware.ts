import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { ValidationError } from '../../blogs/types/validationError';

export const BlogPostBodyValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors: ValidationError[] = [];
  const { title, shortDescription, content } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length < 1 || title.trim().length > 30) {
    errors.push({ field: 'title', message: 'Invalid post title' });
  }

  if (
    !shortDescription ||
    typeof shortDescription !== 'string' ||
    shortDescription.trim().length < 1 ||
    shortDescription.trim().length > 100
  ) {
    errors.push({ field: 'shortDescription', message: 'Invalid post shortDescription' });
  }

  if (!content || typeof content !== 'string' || content.trim().length < 1 || content.trim().length > 1000) {
    errors.push({ field: 'content', message: 'Invalid post content' });
  }

  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  next();
};
