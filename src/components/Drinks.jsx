import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import TitleContext from '../context/TitleContext';
import DrinkContext from '../context/DrinksContext';
import useFetch from '../hooks/useFetch';

function Drinks() {
  const { drinkListArray, setDrinkList } = useContext(DrinkContext);
  const location = useLocation();
  const { setTitle } = useContext(TitleContext);
  const { fetchData } = useFetch();

  useEffect(() => {
    if (location.pathname === '/drinks') {
      setTitle('Drinks');
    }
    fetchData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', setDrinkList);
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
