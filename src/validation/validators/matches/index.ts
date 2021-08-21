import { AppError, FieldValidator } from '@core/validation';

export class MatchesValidator implements FieldValidator {
  constructor(
    readonly field: string,
    private readonly regex: RegExp,
    private readonly message?: string,
  ) {}

  validate(input: any): Error | null {
    return this.regex.test(input[this.field])
      ? null
      : new AppError(this.message);
  }
}
