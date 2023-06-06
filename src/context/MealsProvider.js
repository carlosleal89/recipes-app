import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';
import MealsContext from './MealsContext';
// import useFetch from '../hooks/useFetch';
// import { fetchRecipe } from '../helpers/API_URL';

export default function MealsProvider({ children }) {
  const [mealList, setMealList] = useState([]);
  const [mealListArray, setMealListArray] = useState([]);
  // const [mealsById, setMealsById] = useState([]);
  // const [mealsByCategory, setMealsByCategory] = useState([]);
  // const { fetchData } = useFetch();
  const fetchDataMeals = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMealList(data);
    } catch (error) {
      console.log(error);
    }
  };
  const mealsContext = useMemo(
    () => (
      { mealListArray, fetchDataMeals }),
    [mealListArray],
  );

  useEffect(() => {
    const MAX_LENGTH = 12;
    if (mealList.meals) {
      setMealListArray(mealList.meals.slice(0, MAX_LENGTH));
    }
  }, [mealList]);

  return (
    <MealsContext.Provider
      value={ mealsContext }
    >
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
