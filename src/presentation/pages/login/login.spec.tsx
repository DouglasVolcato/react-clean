import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import Login from "./login";
import { Validation } from "../../protocols/validation";

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate(input: any): string {
    this.input = input;
    return this.errorMessage;
  }
}

type SutTypes = {
  sut: RenderResult;
  validationSpy: Validation;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return { sut, validationSpy };
};

describe("Login Page", () => {
  afterEach(cleanup);

  test("Should not render spinner nor error on start.", () => {
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId("errorWrap");
    expect(errorWrap.childElementCount).toBe(0);
  });

  test("Should start with initial button disabled.", () => {
    const { sut } = makeSut();
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test("Should start with email input title as required field.", () => {
    const { sut } = makeSut();
    const emailStatusInput = sut.getByTestId(
      "email-status"
    ) as HTMLInputElement;
    expect(emailStatusInput.title).toBe("Required field");
  });

  test("Should start with password input title as required field.", () => {
    const { sut } = makeSut();
    const passwordStatusInput = sut.getByTestId(
      "password-status"
    ) as HTMLInputElement;
    expect(passwordStatusInput.title).toBe("Required field");
  });

  test("Should call validation with correct email.", () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    expect(validationSpy.input).toEqual({
      email: "any_email",
    });
  });

  test("Should call validation with correct password.", () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    expect(validationSpy.input).toEqual({
      password: "any_password",
    });
  });
});
