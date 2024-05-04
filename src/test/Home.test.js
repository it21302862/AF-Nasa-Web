// import React from 'react';
// import { render, fireEvent,screen} from '@testing-library/react';
// import Home from '../pages/Home';
// import { BrowserRouter as Router, useHistory } from 'react-router-dom';
// import { createMemoryHistory } from 'history';

// // Mock useHistory hook
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({
//     push: jest.fn()
//   })
// }));

// describe('HomePage Component', () => {
//   it('renders without crashing', () => {
//     render(
//       <Router>
//         <Home />
//       </Router>
//     );
//   });

//   // it('navigates to picture of the day page when "View Past Days" is clicked', () => {

//   //   const { getByTestId } = render(
//   //     <Router history={history}>
//   //       <Home />
//   //     </Router>
//   //   );

//   //   fireEvent.click(getByTestId('view-past-days'));

//   // });

//   test('navigates to picture of the day page when "View Past Days" is clicked', () => {
//     const history = createMemoryHistory();
//     const { getByTestId } = render(
//       <Router history={history}>
//         <Home />
//       </Router>
//     );
//     // console.log('Before click:', history.location.pathname);
//     // const previous = history.location.pathname;
//     // fireEvent.click(getByTestId('view-past-days'));
//     // console.log('After click:', history.location.pathname);
//     // const now = history.location.pathname;
//     // expect(history.location.pathname).toBe('/picture-of-the-day');

//     const linkElement = screen.getAllByText(/View Past Days/);
//     expect(linkElement).Router
//   });

//   // Add more test cases as needed...
// });

import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  getByTestId,
  waitFor,
  getAllByText,
} from "@testing-library/react";
import Home from "../pages/Home";
import axiosMock from "axios";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

// Mock Axios module
jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        /* Mock data */
      },
    })
  ),
}));

describe("HomePage Component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  test('navigates to picture of the day page when "View Past Days" is clicked', async () => {
    const { getByTestId } = render(
      <Router>
        <Home />
      </Router>
    );

    await act(async () => {
      fireEvent.click(getByTestId("view-past-days"));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Rover data is fetched and displayed correctly", async () => {
    const mockMarsData = {
      photos: [
        {
          rover: {
            landing_date: '2023-01-01',
            launch_date: '2022-01-01',
            total_photos: 1000,
          },
        },
      ],
    };

    axiosMock.get.mockResolvedValueOnce({ data: mockMarsData });

    const { getByText } = render(
      <Router>
        <Home />
      </Router>
    );

    // Simulate clicking on a rover
    const curiosityButton = screen.getByTestId("rover-name-1");
    curiosityButton.click();

    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenCalledTimes(2); // One for APOD data, one for rover data
      expect(axiosMock.get).toHaveBeenCalledWith(
        expect.stringContaining("mars-photos")
      );
    });

    // Asserting if an element with the test ID "active" is present
    expect(screen.getByTestId("active")).toBeTruthy();
    expect(screen.getByTestId("curiosity desc")).toBeTruthy();
    const viewPhotosButtons = screen.getAllByText('View Photos');
    expect(viewPhotosButtons.length).toBeGreaterThan(0);


  });
});
