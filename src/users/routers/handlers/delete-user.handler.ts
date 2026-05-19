import { Request, Response } from 'express';
import { usersService } from '../../application/users.service';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { DomainError } from '../../../core/errors/domain.error';

export async function deleteUserHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    await usersService.delete(req.params.id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    if (e instanceof DomainError) {
      res
        .status(e.code)
        .send(createErrorMessages([{ field: 'id', message: e.message }]));
      return;
    }
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
