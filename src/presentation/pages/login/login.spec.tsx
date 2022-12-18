import React from "react";
import { render } from "@testing-library/react";
import Login from "./login";

describe("Login Page", () => {
  test("Should not render spinner nor error on start.", () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId("errorWrap");
    expect(errorWrap.childElementCount).toBe(0);
  });


});
