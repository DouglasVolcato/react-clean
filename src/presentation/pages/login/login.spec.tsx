import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import Login from "./login";
import { Validation } from "../../protocols/validation";
import { ValidationSpy } from "../../test/mock-validation";

type SutTypes = {
  sut: RenderResult;
  validationSpy: Validation;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = "Error message";
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

  test("Should call validation with correct email.", () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    expect(validationSpy.fieldName).toEqual("email");
    expect(validationSpy.fieldValue).toEqual("any_email");
  });

  test("Should call validation with correct password.", () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    expect(validationSpy.fieldName).toEqual("password");
    expect(validationSpy.fieldValue).toEqual("any_password");
  });

  test("Should show email error if validation fails.", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Error message");
  });

  test("Should show email error if validation fails.", () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Error message");
  });

  test("Should show valid state if password validation succeeds.", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    const passwordInput = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Everything is fine!");
  });

  test("Should show valid state if email validation succeeds.", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Everything is fine!");
  });

  test("Should enable submit button if form is valid.", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    const passwordInput = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show spinner on submit.", async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    const passwordInput = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: "any_password" } });
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submitButton);
    setTimeout(() => {
      const spinner = sut.getByTestId("spinner") as HTMLSpanElement;
      expect(spinner).toBeTruthy();
    }, 1000);
  });
});
