import { useState, useEffect } from 'react';
import { sheetParser } from '../utils/sheetparser';

export default function useRestaurants(csvUrl) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!csvUrl) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(csvUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const text = await response.text();

        const parsedData = sheetParser(text);

        setRestaurants(parsedData);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [csvUrl]);

  return { restaurants, loading, error };
}