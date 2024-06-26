import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
//import '@testing-library/jest-dom/extend-expect';
import App from "./App";
import { useFetchApi } from "./services/useFetchApi";
import { calculateMonthlyPoints } from "./utils/calculateMonthlyPoints";
//import { mockApiData, mockMonthlyPoints } from './__mocks__/mockData';

jest.mock("./services/useFetchApi");
jest.mock("./utils/calculateMonthlyPoints");

export const mockMonthlyPoints = {
  January: 100,
};

describe("App Component", () => {
  beforeEach(() => {
    useFetchApi.mockReturnValue({
      fetchData: jest.fn(),
      apiData: [],
      loading: true,
      error: "",
    });
    calculateMonthlyPoints.mockImplementation(() => mockMonthlyPoints);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading initially", () => {
    render(<App />);
    expect(screen.getByText("... Loading")).toBeInTheDocument();
  });

  test("renders error message", async () => {
    useFetchApi.mockReturnValue({
      fetchData: jest.fn(),
      apiData: [],
      loading: false,
      error: "Failed to fetch data",
    });

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument()
    );
  });

  test("renders customer rewards data", async () => {
    useFetchApi.mockReturnValue({
      fetchData: jest.fn(),
      apiData: [
        {
          customerId: 10,
          customerName: "James Brown",
          transactions: [
            {
              transactionId: 100,
              purchaseAmount: 120,
              dateOfTransaction: "01/04/2024",
            },
            {
              transactionId: 101,
              purchaseAmount: 100,
              dateOfTransaction: "01/05/2024",
            },
          ],
        },
        {
          customerId: 11,
          customerName: "Michael Phelps",
          transactions: [
            {
              transactionId: 102,
              purchaseAmount: 50,
              dateOfTransaction: "01/04/2024",
            },
            {
              transactionId: 103,
              purchaseAmount: 150,
              dateOfTransaction: "01/08/2024",
            },
          ],
        },
      ],
      loading: false,
      error: "",
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Customer Rewards")).toBeInTheDocument();
      expect(screen.getByText("James Brown")).toBeInTheDocument();
      expect(screen.getByText("Michael Phelps")).toBeInTheDocument();
      expect(screen.getAllByText("January: 100 points")[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Total Points:/)[0]).toBeInTheDocument();
    });
  });
});
