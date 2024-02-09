import { useLocation, Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import TitleContext from '../context/TitleContext';
import DrinkContext from '../context/DrinksContext';
import DrinksCategories from './DrinksCategories';

function Drinks() {
  const { drinkList } = useContext(DrinkContext);
  const location = useLocation();
  const { setTitle } = useContext(TitleContext);
  const DRINKS_LIST_MAX_LENGTH = 12;

  useEffect(() => {
    if (location.pathname === '/drinks') {
      setTitle('Drinks');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>

      <DrinksCategories />
      <div className="recipes-container">
        {drinkList.slice(0, DRINKS_LIST_MAX_LENGTH).map((drink, index) => (
          <Link
            className="link-container"
            to={ `/drinks/${drink.idDrink}` }
            key={ index }
          >
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
              className="recipe-card-container"
            >
              <p className="recipe-name-text">
                { drink.strDrink }
              </p>
              <img
                className="recipe-img"
                data-testid={ `${index}-card-img` }
                alt={ drink.srtDrink }
                src={ drink.strDrinkThumb }
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Drinks;
