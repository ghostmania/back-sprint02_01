import { Request, Response } from 'express';
import { UserAttributes } from '../../dto/user.attributes';
import { usersService } from '../../application/users.service';
import { mapToUserViewModel } from '../mappers/map-to-user-view-model.util';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function createUserHandler(
  req: Request<{}, {}, UserAttributes>,
  res: Response,
) {
  try {
    const createdBlogId = await usersService.createUser(req.body);
    const createdBlog = await usersService.findByIdOrFail(createdBlogId);
    res.status(HttpStatus.Created).send(mapToUserViewModel(createdBlog));
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
