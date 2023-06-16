import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import MealsCategories from './MealsCategories';

export default function MealsCategoriesFiltered() {
  const { mealsCategoriesFilter } = useContext(MealsContext);
  const MEALS_LIST_MAX_LENGTH = 12;
  return (
    <div>
      <MealsCategories />
      <div className="recipes-container">
        {mealsCategoriesFilter.slice(0, MEALS_LIST_MAX_LENGTH).map((recipe, index) => (
          <Link className="link-container" to={ `/meals/${recipe.idMeal}` } key={ index }>
            <div
              className="filtered-recipe-container"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <p
                className="recipe-filtered-name-text"
                data-testid={ `${index}-card-name` }
              >
                { recipe.strMeal }
              </p>
              <img
                className="recipe-img"
                data-testid={ `${index}-card-img` }
                alt={ recipe.srtMeal }
                src={ recipe.strMealThumb }
              />
            </div>
          </Link>))}
      </div>
    </div>
  );
}
