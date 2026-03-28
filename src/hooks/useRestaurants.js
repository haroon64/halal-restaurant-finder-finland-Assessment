import { useState, useEffect } from "react";
import { sheetParser } from "../utils/sheetparser";

// Static test data
import { staticRestaurants } from "./../utils/staticData";

export default function useRestaurants(csvUrl) {
  // const staticRestaurants = []
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!csvUrl) {
      // No CSV provided → just use static data
      setRestaurants(staticRestaurants);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(csvUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const text = await response.text();
        const parsedData = sheetParser(text);

        // Merge static + fetched data
        setRestaurants([...staticRestaurants, ...parsedData]);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
        // Fall back to static data if fetch fails
        setRestaurants(staticRestaurants);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  return { restaurants, loading, error };
}
