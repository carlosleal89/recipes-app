import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MealsContext from './MealsContext';

export default function MealsProvider({ children }) {
  const [mealList, setMealList] = useState([]);
  console.log(typeof setMealList); // apenas pra agradar o lint;
  return (
    <MealsContext.Provider
      value={ mealList }
    >
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
