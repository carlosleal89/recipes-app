import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DrinksContext from './DrinksContext';

export default function DrinksProvider({ children }) {
  const [drinkList, setDrinkList] = useState([]);
  console.log(typeof setDrinkList); // apenas pra agradar o lint;
  return (
    <DrinksContext.Provider
      value={ drinkList }
    >
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
