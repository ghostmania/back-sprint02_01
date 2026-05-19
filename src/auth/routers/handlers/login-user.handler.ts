import { Request, Response } from 'express';
import { LoginAttributes } from '../../dto/login.attributes';
import { authService } from '../../application/auth.service';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function loginUserHandler(
  req: Request<{}, {}, LoginAttributes>,
  res: Response,
) {
  try {
    const isValid = await authService.login(req.body);
    if (!isValid) {
      res.sendStatus(HttpStatus.Unauthorized);
      return;
    }
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
