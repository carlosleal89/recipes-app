import { useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (fn, setContextState) => {
    try {
      setIsLoading(true);
      const response = await fn;
      setContextState(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading };
};

export default useFetch;
