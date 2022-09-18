import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Anouncement from "./Anouncement";

test("render content", () => {
  const error = {
    type: "error",
    message: "it should be displayed",
  };

  render(<Anouncement message={error.message} type={error.type} />);
  const element = screen.getByText("it should be displayed");
  expect(element).toBeDefined();
});
