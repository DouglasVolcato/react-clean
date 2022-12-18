export interface Validation {
  errorMessage: string;
  input: object;
  validate(input: any): string;
}
