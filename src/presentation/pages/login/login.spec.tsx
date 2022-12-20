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
import { AuthenticationSpy } from "../../test/mock-authentication";

const simulateValidSubmit = (
  sut: RenderResult,
  email = "any_email",
  password = "any_password"
) => {
  const emailInput = sut.getByTestId("email") as HTMLInputElement;
  fireEvent.input(emailInput, { target: { value: email } });
  const passwordInput = sut.getByTestId("password") as HTMLInputElement;
  fireEvent.input(passwordInput, { target: { value: password } });
  const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
  fireEvent.click(submitButton);
};

const populateEmailField = (sut: RenderResult, email = "any_email") => {
  const emailInput = sut.getByTestId("email") as HTMLInputElement;
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (
  sut: RenderResult,
  password = "any_password"
) => {
  const passwordInput = sut.getByTestId("password") as HTMLInputElement;
  fireEvent.input(passwordInput, { target: { value: password } });
};

type SutTypes = {
  sut: RenderResult;
  validationSpy: Validation;
  authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy();
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = "Error message";
  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  );
  return { sut, validationSpy, authenticationSpy };
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
    populateEmailField(sut);
    expect(validationSpy.fieldName).toEqual("email");
    expect(validationSpy.fieldValue).toEqual("any_email");
  });

  test("Should call validation with correct password.", () => {
    const { sut, validationSpy } = makeSut();
    populatePasswordField(sut);
    expect(validationSpy.fieldName).toEqual("password");
    expect(validationSpy.fieldValue).toEqual("any_password");
  });

  test("Should show email error if validation fails.", () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Error message");
  });

  test("Should show email error if validation fails.", () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Error message");
  });

  test("Should show valid state if password validation succeeds.", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    simulateValidSubmit(sut);
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Everything is fine!");
  });

  test("Should show valid state if email validation succeeds.", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    simulateValidSubmit(sut);
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Everything is fine!");
  });

  test("Should enable submit button if form is valid.", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    simulateValidSubmit(sut);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show spinner on submit.", async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = null;
    simulateValidSubmit(sut);
    setTimeout(() => {
      const spinner = sut.getByTestId("spinner") as HTMLSpanElement;
      expect(spinner).toBeTruthy();
    }, 500);
  });

  test("Should call authentication with correct values.", async () => {
    const { sut, validationSpy, authenticationSpy } = makeSut();
    validationSpy.errorMessage = null;
    const email = "any_email";
    const password = "any_password";
    simulateValidSubmit(sut);
    setTimeout(() => {
      expect(authenticationSpy.params).toEqual({ email, password });
    }, 500);
  });

  test("Should call authentication only once.", async () => {
    const { sut, validationSpy, authenticationSpy } = makeSut();
    validationSpy.errorMessage = null;
    const email = "any_email";
    const password = "any_password";
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);
    setTimeout(() => {
      expect(authenticationSpy.callsCount).toBe(1);
    }, 500);
  });

  test("Should not call if form is invalid.", async () => {
    const { sut, validationSpy, authenticationSpy } = makeSut();
    validationSpy.errorMessage = null;
    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId("form"));
    setTimeout(() => {
      expect(authenticationSpy.callsCount).toBe(0);
    }, 500);
  });
});
