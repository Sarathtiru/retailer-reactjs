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
  console.log(pointsByMonth);
  return pointsByMonth;
};

// Calculates points per month
const calculatePoints = (amount) => {
  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }

  if (amount > 50) {
    points += amount - 50;
  }

  return points;
};
