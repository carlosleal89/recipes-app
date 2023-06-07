import { useLocation, Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import TitleContext from '../context/TitleContext';
import DrinkContext from '../context/DrinksContext';
import useFetch from '../hooks/useFetch';
import DrinksCategories from './DrinksCategories';

function Drinks() {
  const { drinkListArray, setDrinkList } = useContext(DrinkContext);
  const location = useLocation();
  const { setTitle } = useContext(TitleContext);
  const { fetchData } = useFetch();
  const DRINKS_LIST_MAX_LENGTH = 12;

  useEffect(() => {
    if (location.pathname === '/drinks') {
      setTitle('Drinks');
    }
    fetchData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', setDrinkList);
  }, [setTitle, location]);

  return (
    <div>
      <DrinksCategories />
      {drinkListArray.slice(0, DRINKS_LIST_MAX_LENGTH).map((drink, index) => (
        <Link to={ `/drinks/${drink.idDrink}` } key={ index }>
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
        </Link>
      ))}
    </div>
  );
}

export default Drinks;
