import { AppError, FieldValidator } from '@core/validation';

import { regexEmail } from '@utils/regex';

export class EmailValidator implements FieldValidator {
  constructor(readonly field: string) {}

  validate(input: any): Error | null {
    return !input[this.field] || regexEmail.test(input[this.field])
      ? null
      : new AppError('Invalid email');
  }
}
