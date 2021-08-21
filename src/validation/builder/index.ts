import {
  EmailValidator,
  MatchesValidator,
  MinLengthValidator,
  RequiredValidator,
} from '@validation/validators';

interface BuilderValidators {
  required(): ValidationBuilder;
  min(length: number): ValidationBuilder;
  matches(regex: RegExp, message?: string): ValidationBuilder;
  email(): ValidationBuilder;
}

class ValidationBuilder implements BuilderValidators {
  private fieldName;
  private validations: any = [];

  public field(name) {
    this.fieldName = name;
    return this;
  }

  public static type() {
    return new ValidationBuilder();
  }

  public required() {
    this.validations.push(new RequiredValidator(this.fieldName));
    return this;
  }

  public min(length: number) {
    this.validations.push(new MinLengthValidator(this.fieldName, length));
    return this;
  }

  public matches(regex: RegExp, message?: string) {
    this.validations.push(new MatchesValidator(this.fieldName, regex, message));
    return this;
  }

  public email() {
    this.validations.push(new EmailValidator(this.fieldName));
    return this;
  }

  public build() {
    return this.validations;
  }
}

export default ValidationBuilder;
