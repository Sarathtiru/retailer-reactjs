import { calculateMonthlyPoints } from './calculateMonthlyPoints';

describe('calculateMonthlyPoints', () => {
  it('should calculate points correctly for a single transaction', () => {
    const transactions = [
      { dateOfTransaction: '2024-01-04', purchaseAmount: 120 }
    ];

    const expected = {
      January: 90
    };

    expect(calculateMonthlyPoints(transactions)).toEqual(expected);
  });

  it('should calculate points correctly for multiple transactions in the same month', () => {
    const transactions = [
      { dateOfTransaction: '2024-01-04', purchaseAmount: 120 },
      { dateOfTransaction: '2024-01-15', purchaseAmount: 75 }
    ];

    const expected = {
      January: 115 // 90 + 25
    };

    expect(calculateMonthlyPoints(transactions)).toEqual(expected);
  });

  it('should calculate points correctly for transactions in different months', () => {
    const transactions = [
      { dateOfTransaction: '2024-01-04', purchaseAmount: 120 },
      { dateOfTransaction: '2024-02-15', purchaseAmount: 75 }
    ];

    const expected = {
      January: 90,
      February: 25
    };

    expect(calculateMonthlyPoints(transactions)).toEqual(expected);
  });

  it('should return an empty object for no transactions', () => {
    const transactions = [];

    const expected = {};

    expect(calculateMonthlyPoints(transactions)).toEqual(expected);
  });

  it('should handle transactions exactly at the threshold correctly', () => {
    const transactions = [
      { dateOfTransaction: '2024-01-04', purchaseAmount: 50 },
      { dateOfTransaction: '2024-01-15', purchaseAmount: 100 }
    ];

    const expected = {
      January: 50 // 0 + 0 + 50
    };

    expect(calculateMonthlyPoints(transactions)).toEqual(expected);
  });

  it('should handle transactions below the threshold correctly', () => {
    const transactions = [
      { dateOfTransaction: '2024-01-04', purchaseAmount: 30 },
      { dateOfTransaction: '2024-01-15', purchaseAmount: 40 }
    ];

    const expected = {
      January: 0 // 0 points
    };

    expect(calculateMonthlyPoints(transactions)).toEqual(expected);
  });
});
