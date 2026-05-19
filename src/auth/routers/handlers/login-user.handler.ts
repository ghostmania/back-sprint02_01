import { Request, Response } from 'express';
import { LoginAttributes } from '../../dto/login.attributes';
import { authService } from '../../application/auth.service';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function loginUserHandler(
  req: Request<{}, {}, LoginAttributes>,
  res: Response,
) {
  try {
    const login = await authService.login(req.body);
    res.status(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
