import { Request, Response } from 'express';
import { LoginAttributes } from '../../dto/login.attributes';
import { authService } from '../../application/auth.service';
import { HttpStatus } from '../../../core/types/http-statuses';
import { usersRepository } from '../../../users/repositories/users.repository';

export async function loginUserHandler(
  req: Request<{}, {}, LoginAttributes>,
  res: Response,
) {
  try {
    const userExists = await usersRepository.findByLoginOrEmail(
      req.body.loginOrEmail,
    );
    if (!userExists) {
      res.sendStatus(HttpStatus.NotFound);
    }
    res.status(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
