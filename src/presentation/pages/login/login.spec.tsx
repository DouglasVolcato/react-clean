import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Login from "./login";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Login />);
  return { sut };
};

describe("Login Page", () => {
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
    const emailInput = sut.getByTestId("email-status");
    expect(emailInput.title).toBe("Required field");
  });

  test("Should start with password input title as required field.", () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password-status");
    expect(passwordInput.title).toBe("Required field");
  });
});
