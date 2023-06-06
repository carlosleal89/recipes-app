import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import MealsContext from './MealsContext';

export default function MealsProvider({ children }) {
  const [mealList, setMealList] = useState('test');
  const mealsContext = useMemo(() => (
    { mealList, setMealList }), [mealList, setMealList]);
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
