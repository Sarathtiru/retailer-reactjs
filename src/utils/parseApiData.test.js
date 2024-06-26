import { parseApiData } from './parseApiData';

describe('parseApiData', () => {
  it('should parse single transaction correctly', () => {
    const apiData = [
      {
        transactionId: 100,
        purchaseAmount: 120,
        dateOfTransaction: "01/04/2024",
        customerId: 10,
        customerName: "James Brown"
      }
    ];

    const expected = [
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

    expect(parseApiData(apiData)).toEqual(expected);
  });

  it('should parse multiple transactions for the same customer correctly', () => {
    const apiData = [
      {
        transactionId: 100,
        purchaseAmount: 120,
        dateOfTransaction: "01/04/2024",
        customerId: 10,
        customerName: "James Brown"
      },
      {
        transactionId: 101,
        purchaseAmount: 75,
        dateOfTransaction: "01/05/2024",
        customerId: 10,
        customerName: "James Brown"
      }
    ];

    const expected = [
      {
        customerId: '10',
        customerName: 'James Brown',
        transactions: [
          {
            transactionId: '100',
            purchaseAmount: '120',
            dateOfTransaction: '01/04/2024'
          },
          {
            transactionId: '101',
            purchaseAmount: '75',
            dateOfTransaction: '01/05/2024'
          }
        ]
      }
    ];

    expect(parseApiData(apiData)).toEqual(expected);
  });

  it('should parse transactions for different customers correctly', () => {
    const apiData = [
      {
        transactionId: 100,
        purchaseAmount: 120,
        dateOfTransaction: "01/04/2024",
        customerId: 10,
        customerName: "James Brown"
      },
      {
        transactionId: 102,
        purchaseAmount: 50,
        dateOfTransaction: "01/04/2024",
        customerId: 11,
        customerName: "Michael Phelps"
      }
    ];

    const expected = [
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
      },
      {
        customerId: '11',
        customerName: 'Michael Phelps',
        transactions: [
          {
            transactionId: '102',
            purchaseAmount: '50',
            dateOfTransaction: '01/04/2024'
          }
        ]
      }
    ];

    expect(parseApiData(apiData)).toEqual(expected);
  });

  it('should handle empty input array', () => {
    const apiData = [];

    const expected = [];

    expect(parseApiData(apiData)).toEqual(expected);
  });

  it('should handle multiple transactions for multiple customers', () => {
    const apiData = [
      {
        transactionId: 100,
        purchaseAmount: 120,
        dateOfTransaction: "01/04/2024",
        customerId: 10,
        customerName: "James Brown"
      },
      {
        transactionId: 101,
        purchaseAmount: 75,
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
    ];

    const expected = [
      {
        customerId: '10',
        customerName: 'James Brown',
        transactions: [
          {
            transactionId: '100',
            purchaseAmount: '120',
            dateOfTransaction: '01/04/2024'
          },
          {
            transactionId: '101',
            purchaseAmount: '75',
            dateOfTransaction: '01/05/2024'
          }
        ]
      },
      {
        customerId: '11',
        customerName: 'Michael Phelps',
        transactions: [
          {
            transactionId: '102',
            purchaseAmount: '50',
            dateOfTransaction: '01/04/2024'
          },
          {
            transactionId: '103',
            purchaseAmount: '150',
            dateOfTransaction: '01/08/2024'
          }
        ]
      }
    ];

    expect(parseApiData(apiData)).toEqual(expected);
  });
});