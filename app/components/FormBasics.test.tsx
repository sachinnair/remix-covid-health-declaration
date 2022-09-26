/**
 * @vitest-environment happy-dom
 */

import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Component from "./FormBasics";

describe("Basics form test", () => {
  test("should be able to enter valid temperatures in Celsius", async () => {
    const user = userEvent.setup();
    render(<Component />);
    const temperatureField = screen.getByRole("spinbutton", {
      name: "Temperature",
    });
    await user.click(temperatureField);
    await user.keyboard("97");
    // screen.debug(temperatureField);
    expect(true).toBe(true);
    expect(screen.getByText(/° F/i)).toHaveAttribute("data-active");
  });

  test("should be able to enter valid temperatures in Fahrenheit", async () => {
    const user = userEvent.setup();
    render(<Component />);
    const temperatureField = screen.getByRole("spinbutton", {
      name: "Temperature",
    });
    await user.click(temperatureField);
    await user.keyboard("39");
    expect(screen.getByText(/° C/i)).toHaveAttribute("data-active");
  });
});

// https://github.com/capricorn86/happy-dom/issues/534
