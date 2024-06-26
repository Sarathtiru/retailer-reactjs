import { useEffect } from "react";
import "./App.css";
import { useFetchApi } from "./services/useFetchApi";
import log from "./logger";
import Rewards from "./components/Rewards/Rewards";

const App = () => {
  const { fetchData, apiData, loading, error } = useFetchApi();

  useEffect(() => {
    log.info("Component mounted or updated");
    const fetchApi = async () => {
      try {
        await fetchData();
        log.info("Data fetched successfully");
      } catch (err) {
        log.error("Failed to fetch data:", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="App">
      <Rewards apiData={apiData} loading={loading} error={error} />
    </div>
  );
};

export default App;
