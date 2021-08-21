import { AppError, FieldValidator } from '@core/validation';

export class RequiredValidator implements FieldValidator {
  constructor(readonly field: any) {}

  validate(input: any): Error | null {
    return input[this.field]?.length > 0
      ? null
      : new AppError('Required field');
  }
}
