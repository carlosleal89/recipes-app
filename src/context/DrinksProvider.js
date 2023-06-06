import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import DrinksContext from './DrinksContext';

export default function DrinksProvider({ children }) {
  const [drinkList, setDrinkList] = useState([]);
  // const [drinksById, setDrinksById] = useState([]);
  // const [drinksByCategory, setDrinksByCategory] = useState([]);
  const drinksContext = useMemo(() => (
    { drinkList, setDrinkList }), [drinkList, setDrinkList]);
  return (
    <DrinksContext.Provider
      value={ drinksContext }
    >
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
