import { AppError, FieldValidator } from '@core/validation';

export class MinLengthValidator implements FieldValidator {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: any): Error | null {
    return input[this.field]?.length < this.minLength
      ? new AppError('Invalid length')
      : null;
  }
}
