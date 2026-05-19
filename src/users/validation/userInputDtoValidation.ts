import { UserInputDto } from '../dto/user.input-dto';
import { ValidationError } from '../types/validationError';

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const userInputDtoValidation = (
  data: UserInputDto,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (
    !data.login ||
    (data.login && typeof data.login !== 'string') ||
    (data.login && data.login.trim().length < 3) ||
    (data.login && data.login.trim().length > 10)
  ) {
    errors.push({ field: 'login', message: 'Invalid login' });
  }

  if (
    !data.password ||
    (data.password && typeof data.password !== 'string') ||
    (data.password && data.password.trim().length < 6) ||
    (data.password && data.password.trim().length > 20)
  ) {
    errors.push({ field: 'password', message: 'Invalid password' });
  }

  if (
    !data.email ||
    (data.email && typeof data.email !== 'string') ||
    (data.email && !EMAIL_PATTERN.test(data.email.trim()))
  ) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }

  return errors;
};
