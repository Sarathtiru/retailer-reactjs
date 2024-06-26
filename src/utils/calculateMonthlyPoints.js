import {calculatePoints} from './calculatePoints'

/** This function dynamically calculates monthly points based on the given transaction information from api call */

export const calculateMonthlyPoints = (transactions) => {
  const pointsByMonth = {};

  transactions.forEach((transaction) => {
    const month = new Date(transaction.dateOfTransaction).toLocaleString(
      "default",
      { month: "long" }
    );
    const points = calculatePoints(transaction.purchaseAmount);

    if (!pointsByMonth[month]) {
      pointsByMonth[month] = 0;
    }

    pointsByMonth[month] += points;
  });
 
  return pointsByMonth;
};

