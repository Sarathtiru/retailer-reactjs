import { useEffect } from "react";
import "./App.css";
import { calculateMonthlyPoints } from "./utils/calculateMonthlyPoints.js";
import Error from "./components/Error";
import { useFetchApi } from "./services/useFetchApi";
import log from "./logger";

const App = () => {
  const { fetchData, apiData, loading, error } = useFetchApi();

  useEffect(() => {
    log.info("Component mounted or updated");
    const fetchApi = async () => {
      try {
        await fetchData("transactions.json");
        log.info("Data fetched successfully");
      } catch (err) {
        log.error("Failed to fetch data:", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="App">
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

export default App;
