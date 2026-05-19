import { NextFunction } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { userInputDtoValidation } from '../validation/userInputDtoValidation';
import { createErrorMessages } from '../../core/utils/error.utils';
import { Request, Response } from 'express';

export const UserHasValidFIeldsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = userInputDtoValidation({
    ...req.body,
  });

  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }
  next(); // Успешная авторизация, продолжаем
};
