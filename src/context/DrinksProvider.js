import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DrinksContext from './DrinksContext';

export default function DrinksProvider({ children }) {
  const [drinkList, setDrinkList] = useState([]);
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
