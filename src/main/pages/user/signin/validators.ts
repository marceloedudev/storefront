import ValidationBuilder from '@validation/builder';
import ValidationShape from '@validation/shape';
import { regexPassword } from '@utils/regex';

export const fieldValidators = () =>
  ValidationShape.build({
    email: ValidationBuilder.type().required().email().build(),
    password: ValidationBuilder.type()
      .required()
      .matches(
        regexPassword,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      )
      .build(),
  });
