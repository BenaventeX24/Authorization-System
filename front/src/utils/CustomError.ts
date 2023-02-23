export class CustomError extends Error {
  public code: string;
  constructor(message: string, code: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
    this.code = code;
  }
}
