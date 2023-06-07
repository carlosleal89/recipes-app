import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';
import MealsContext from './MealsContext';

export default function MealsProvider({ children }) {
  const [mealList, setMealList] = useState([]);
  const [mealListArray, setMealListArray] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [mealsCategoriesFilter, setMealsCategoriesFilter] = useState([]);
  const [showMealCategoriesFilter, setShowMealCategoriesFilter] = useState(true);

  // const fetchDataMeals = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setMealList(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const MEALS_LIST_MAX_LENGTH = 12;
    const MEALS_CATEGORIES_MAX_LENGTH = 5;
    if (mealList.meals) {
      setMealListArray(mealList.meals.slice(0, MEALS_LIST_MAX_LENGTH));
    }
    if (mealsCategories.meals) {
      setMealsCategories(mealsCategories.meals.slice(0, MEALS_CATEGORIES_MAX_LENGTH));
    }
    if (mealsCategoriesFilter.meals) {
      setMealsCategoriesFilter(mealsCategoriesFilter.meals);
    }
  }, [mealList, mealsCategories, mealsCategoriesFilter]);

  const mealsContext = useMemo(
    () => (
      {
        mealListArray,
        setMealList,
        mealsCategories,
        setMealsCategories,
        setMealsCategoriesFilter,
        mealsCategoriesFilter,
        showMealCategoriesFilter,
        setShowMealCategoriesFilter,
      }),
    [mealListArray],
  );

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
