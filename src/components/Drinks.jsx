import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import TitleContext from '../context/TitleContext';
import DrinkContext from '../context/DrinksContext';

function Drinks() {
  const { drinkListArray, fetchDataDrinks } = useContext(DrinkContext);
  const location = useLocation();
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    if (location.pathname === '/drinks') {
      setTitle('Drinks');
    }
    fetchDataDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }, [setTitle, location]);
  return (
    drinkListArray.map((drink, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ index }>
        <img
          data-testid={ `${index}-card-img` }
          alt={ drink.srtDrink }
          src={ drink.strDrinkThumb }
        />
        <p data-testid={ `${index}-card-name` }>
          { drink.strDrink }
        </p>
      </div>
    )));
}

export default Drinks;
