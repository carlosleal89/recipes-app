import { useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url, setContextState) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setContextState(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading };
};

export default useFetch;
