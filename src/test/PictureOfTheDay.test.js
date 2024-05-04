import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import PictureOfTheDay from "../pages/PictureOfTheDay";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

test("renders search option dropdown with default value", () => {
  render(
    <Router>
      <PictureOfTheDay />
    </Router>
  );
  const searchOptionButton = screen.getByText("Search Option:");
  expect(searchOptionButton).toBeInTheDocument();
  expect(searchOptionButton).toHaveTextContent("Search Option:");
});

test("renders date picker when Date option is selected", async () => {
  render(
    <Router>
      <PictureOfTheDay />
    </Router>
  );
  const dateOption = screen.getByText("date");
  fireEvent.click(dateOption);

  const datePicker = screen.getByRole("textbox");
  expect(datePicker).toBeInTheDocument();
});

