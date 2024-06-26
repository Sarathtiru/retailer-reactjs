import { useState } from "react";
import { parseApiData } from "../utils/parseApiData";
import log from "../logger";

export const useFetchApi = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async (path) => {
    try {
      //Simulating API call
      const result = await (await fetch(path)).json();
      setApiData(parseApiData(result));
      log.info("Data fetched successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.toString());
      log.error("Failed to fetch data", error);
      setLoading(false);
      throw err;
    }
  };

  return { fetchData, apiData, loading, error };
};
