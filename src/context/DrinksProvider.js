import PropTypes from 'prop-types';
import React, { useState, useMemo, useEffect } from 'react';
import DrinksContext from './DrinksContext';

export default function DrinksProvider({ children }) {
  const [drinkList, setDrinkList] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [drinksCategoriesFilter, setDrinksCategoriesFilter] = useState([]);
  const [showDrinkCategoriesFilter, setShowDrinkCategoriesFilter] = useState(true);

  useEffect(() => {
    const DRINKS_CATEGORIES_MAX_LENGTH = 5;
    if (drinksCategories.drinks) {
      setDrinksCategories(drinksCategories.drinks.slice(0, DRINKS_CATEGORIES_MAX_LENGTH));
    }
    if (drinksCategoriesFilter.drinks) {
      setDrinksCategoriesFilter(drinksCategoriesFilter.drinks);
    }
  }, [drinkList, drinksCategories, drinksCategoriesFilter]);

  const drinksContext = useMemo(
    () => (
      {
        drinkList,
        setDrinkList,
        drinksCategories,
        setDrinksCategories,
        drinksCategoriesFilter,
        setDrinksCategoriesFilter,
        showDrinkCategoriesFilter,
        setShowDrinkCategoriesFilter,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drinkList, showDrinkCategoriesFilter],
  );
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
