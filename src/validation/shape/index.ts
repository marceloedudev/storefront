import { Validation } from '@core/validation';

class ValidationShape implements Validation {
  private validators = {};

  private constructor(validators) {
    this.validators = validators;
  }

  static build(validators) {
    return new ValidationShape(validators);
  }

  private prepareValidate() {
    const prepareResult = (<any>Object)
      .entries(this.validators)
      .reduce((acc, current) => {
        const [fieldName, validators] = current;
        validators?.forEach((item) => {
          item.field = fieldName;
        });
        acc[fieldName] = validators;
        return acc;
      }, {});

    return prepareResult;
  }

  public filter(input: any) {
    const result = (<any>Object)
      .entries(this.prepareValidate())
      .reduce((accumulator, item) => {
        const [fieldName, validator] = item;

        const errors = validator.reduce((acc, validator) => {
          const error = validator.validate(input);
          if (error) {
            acc.push(error);
          }
          return acc;
        }, []);

        if (errors?.length) {
          accumulator.push({
            fieldName,
            errors,
          });
        }

        return accumulator;
      }, []);

    return result;
  }

  public validate(input: any) {
    const result = (<any>Object)
      .entries(this.prepareValidate())
      .reduce((accumulator, item) => {
        const [fieldName, validator] = item;

        const errors = validator.reduce((acc, validator) => {
          const error = validator.validate(input);
          if (!acc[fieldName]) {
            if (error) {
              acc[fieldName] = {
                message: error.message,
              };
            } else {
              acc[fieldName] = null;
            }
          }
          return acc;
        }, {});

        Object.assign(accumulator, errors);

        return accumulator;
      }, {});

    return result;
  }
}
export default ValidationShape;
