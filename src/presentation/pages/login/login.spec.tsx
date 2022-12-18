import React from "react";
import { render } from "@testing-library/react";
import Login from "./login";

describe("Login Page", () => {
  test("Should not render spinner nor error on start.", () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId("errorWrap");
    expect(errorWrap.childElementCount).toBe(0);
  });

  test("Should start with initial button disabled.", () => {
    const { getByTestId } = render(<Login />);
    const submitButton = getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test("Should start with email input title as required field.", () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId("email-status");
    expect(emailInput.title).toBe("Required field");
  });

  test("Should start with password input title as required.", () => {
    const { getByTestId } = render(<Login />);
    const passwordInput = getByTestId("password-status");
    expect(passwordInput.title).toBe("Required field");
  });
});
