import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';
import MealsContext from './MealsContext';

export default function MealsProvider({ children }) {
  const [mealList, setMealList] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [mealsCategoriesFilter, setMealsCategoriesFilter] = useState([]);
  const [showMealCategoriesFilter, setShowMealCategoriesFilter] = useState(true);

  useEffect(() => {
    const MEALS_CATEGORIES_MAX_LENGTH = 5;
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
        mealList,
        setMealList,
        mealsCategories,
        setMealsCategories,
        mealsCategoriesFilter,
        setMealsCategoriesFilter,
        showMealCategoriesFilter,
        setShowMealCategoriesFilter,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mealList, showMealCategoriesFilter],
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
