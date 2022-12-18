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
});
