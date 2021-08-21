export interface FieldValidator {
  validate: (input: any | undefined) => Error | null;
}

export interface Validation {
  filter: (input: any) => any[];
  validate: (input: any) => any;
}
