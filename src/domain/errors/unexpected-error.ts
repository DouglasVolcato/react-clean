export class UnexpectedError extends Error {
  constructor() {
    super("Something happened.");
    this.name = "UnexpectedError";
  }
}
