export class AppError extends Error {
  constructor(message?) {
    super(message || 'Unknown Error');
    this.name = 'InvalidValueFieldError';
  }
}
