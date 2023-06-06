import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';
import MealsContext from './MealsContext';
import useFetch from '../hooks/useFetch';
import { fetchRecipe } from '../helpers/API_URL';

export default function MealsProvider({ children }) {
  const [mealList, setMealList] = useState([]);
  // const [mealsById, setMealsById] = useState([]);
  // const [mealsByCategory, setMealsByCategory] = useState([]);
  const mealsContext = useMemo(() => (
    { mealList, setMealList }), [mealList, setMealList]);
  const { fetchData } = useFetch();

  useEffect(() => {
    fetchData(fetchRecipe('https://www.themealdb.com/api/json/v1/1/search.php?s='), setMealList);
    console.log(mealList);
  }, []);

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
