import PropTypes from 'prop-types';
import React, { useState, useMemo, useEffect } from 'react';
import DrinksContext from './DrinksContext';

export default function DrinksProvider({ children }) {
  const [drinkList, setDrinkList] = useState([]);
  const [drinkListArray, setDrinkListArray] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  // const fetchDataDrinks = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setDrinkList(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const drinksContext = useMemo(() => (
    {
      drinkListArray,
      setDrinkList,
      drinksCategories,
      setDrinksCategories,
      setDrinkListArray,
    }), [drinkListArray]);

  useEffect(() => {
    const DRINKS_LIST_MAX_LENGTH = 12;
    const DRINKS_CATEGORIES_MAX_LENGTH = 5;
    if (drinkList.drinks) {
      setDrinkListArray(drinkList.drinks.slice(0, DRINKS_LIST_MAX_LENGTH));
    }
    if (drinksCategories.drinks) {
      setDrinksCategories(drinksCategories.drinks.slice(0, DRINKS_CATEGORIES_MAX_LENGTH));
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
