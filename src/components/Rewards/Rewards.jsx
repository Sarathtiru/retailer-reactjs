import React from "react";
import Error from "../Error/Error";
import { calculateMonthlyPoints } from "../../utils/calculateMonthlyPoints";

const Rewards = ({ apiData, loading, error }) => {
  return (
    <div>
      {apiData && apiData.length > 0 && !loading ? (
        <>
          <h1>Customer Rewards</h1>
          {apiData.map((customer) => {
            const monthlyPoints = calculateMonthlyPoints(customer.transactions);
            const totalPoints = Object.values(monthlyPoints).reduce(
              (acc, points) => acc + points,
              0
            );

            return (
              <div key={customer.customerId} className="customer">
                <h2>{customer.customerName}</h2>
                <ul>
                  {Object.keys(monthlyPoints).map((month) => (
                    <li key={month}>
                      {month}: {monthlyPoints[month]} points
                    </li>
                  ))}
                </ul>
                <p>Total Points: {totalPoints}</p>
              </div>
            );
          })}
        </>
      ) : error && error.length !== 0 ? (
        <Error error={error} />
      ) : (
        <p>... Loading</p>
      )}
    </div>
  );
};

export default Rewards;
