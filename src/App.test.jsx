import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { useFetchApi } from './services/useFetchApi';
import log from './logger';

jest.mock('./services/useFetchApi');
jest.mock('./logger');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    useFetchApi.mockReturnValue({
      fetchData: jest.fn(),
      apiData: [],
      loading: true,
      error: ''
    });

    render(<App />);

    expect(screen.getByText('... Loading')).toBeInTheDocument();
    expect(log.info).toHaveBeenCalledWith('Component mounted or updated');
  });

  it('should render error state', async () => {
    useFetchApi.mockReturnValue({
      fetchData: jest.fn().mockImplementation(() => {
        throw new Error('Failed to fetch data');
      }),
      apiData: [],
      loading: false,
      error: 'Failed to fetch data'
    });

    render(<App />);

    await waitFor(() => expect(screen.getByText('Failed to fetch data')).toBeInTheDocument());
    expect(log.error).toHaveBeenCalledWith('Failed to fetch data:', 'Failed to fetch data');
  });

  it('should render data correctly', async () => {
    const mockData = [
      {
        customerId: '10',
        customerName: 'James Brown',
        transactions: [
          {
            transactionId: '100',
            purchaseAmount: '120',
            dateOfTransaction: '01/04/2024'
          }
        ]
      }
    ];

    useFetchApi.mockReturnValue({
      fetchData: jest.fn(),
      apiData: mockData,
      loading: false,
      error: ''
    });

    render(<App />);

    await waitFor(() => expect(screen.getByText('James Brown')).toBeInTheDocument());
    expect(screen.getByText('January: 90 points')).toBeInTheDocument();
    expect(screen.getByText('Total Points: 90')).toBeInTheDocument();
  });
});
