import PropTypes from 'prop-types';
import React, { useState, useMemo, useEffect } from 'react';
import DrinksContext from './DrinksContext';

export default function DrinksProvider({ children }) {
  const [drinkList, setDrinkList] = useState([]);
  const [drinkListArray, setDrinkListArray] = useState([]);

  const fetchDataDrinks = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDrinkList(data);
    } catch (error) {
      console.log(error);
    }
  };
  const drinksContext = useMemo(() => (
    { drinkListArray, fetchDataDrinks, setDrinkListArray }), [drinkListArray]);

  useEffect(() => {
    const MAX_LENGTH = 12;
    if (drinkList.drinks) {
      setDrinkListArray(drinkList.drinks.slice(0, MAX_LENGTH));
    }
  }, [drinkList]);

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
