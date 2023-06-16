import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';
import DrinksCategories from './DrinksCategories';

export default function DrinksCategoriesFiltered() {
  const { drinksCategoriesFilter } = useContext(DrinksContext);
  const MEALS_LIST_MAX_LENGTH = 12;

  return (
    <div>
      <DrinksCategories />
      <div className="recipes-container">
        {drinksCategoriesFilter.slice(0, MEALS_LIST_MAX_LENGTH).map((drink, index) => (
          <Link
            className="link-container"
            to={ `/drinks/${drink.idDrink}` }
            key={ index }
          >
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <p
                className="recipe-name-text"
                data-testid={ `${index}-card-name` }
              >
                { drink.strDrink }
              </p>
              <img
                className="recipe-img"
                data-testid={ `${index}-card-img` }
                alt={ drink.srtDrink }
                src={ drink.strDrinkThumb }
              />
            </div>
          </Link>))}
      </div>
    </div>
  );
}
