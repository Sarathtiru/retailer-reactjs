import { renderHook, act } from '@testing-library/react';
import { useFetchApi } from './useFetchApi';
import { parseApiData } from '../utils/parseApiData';
import log from '../logger';

// Mock the dependencies
jest.mock('../utils/parseApiData');
jest.mock('../logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        transactionId: 100,
        purchaseAmount: 120,
        dateOfTransaction: "01/04/2024",
        customerId: 10,
        customerName: "James Brown"
      },
      {
        transactionId: 101,
        purchaseAmount: 100,
        dateOfTransaction: "01/05/2024",
        customerId: 10,
        customerName: "James Brown"
      },
      {
        transactionId: 102,
        purchaseAmount: 50,
        dateOfTransaction: "01/04/2024",
        customerId: 11,
        customerName: "Michael Phelps"
      },
      {
        transactionId: 103,
        purchaseAmount: 150,
        dateOfTransaction: "01/08/2024",
        customerId: 11,
        customerName: "Michael Phelps"
      }
    ]),
  })
);

describe('useFetchApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data and update state', async () => {
    parseApiData.mockReturnValue([
      {
        customerId: 10,
        customerName: 'James Brown',
        transactions: [
          { transactionId: 100, purchaseAmount: 120, dateOfTransaction: '01/04/2024' },
          { transactionId: 101, purchaseAmount: 100, dateOfTransaction: '01/05/2024' }
        ]
      },
      {
        customerId: 11,
        customerName: 'Michael Phelps',
        transactions: [
          { transactionId: 102, purchaseAmount: 50, dateOfTransaction: '01/04/2024' },
          { transactionId: 103, purchaseAmount: 150, dateOfTransaction: '01/08/2024' }
        ]
      }
    ]);

    const { result } = renderHook(() => useFetchApi());

    await act(async () => {
      await result.current.fetchData();
    });

    expect(parseApiData).toHaveBeenCalled();
    expect(result.current.apiData).toEqual([
      {
        customerId: 10,
        customerName: 'James Brown',
        transactions: [
          { transactionId: 100, purchaseAmount: 120, dateOfTransaction: '01/04/2024' },
          { transactionId: 101, purchaseAmount: 100, dateOfTransaction: '01/05/2024' }
        ]
      },
      {
        customerId: 11,
        customerName: 'Michael Phelps',
        transactions: [
          { transactionId: 102, purchaseAmount: 50, dateOfTransaction: '01/04/2024' },
          { transactionId: 103, purchaseAmount: 150, dateOfTransaction: '01/08/2024' }
        ]
      }
    ]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
    expect(log.info).toHaveBeenCalledWith('Data fetched successfully');
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Network Error';
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(errorMessage)
    );

    const { result } = renderHook(() => useFetchApi());

    await act(async () => {
      try {
        await result.current.fetchData();
      } catch (e) {
        // Error expected
      }
    });

    expect(result.current.apiData).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(log.error).toHaveBeenCalledWith('Failed to fetch data', errorMessage);
  });
});