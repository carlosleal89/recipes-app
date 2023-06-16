import { useLocation, Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import TitleContext from '../context/TitleContext';
import MealsContext from '../context/MealsContext';
import useFetch from '../hooks/useFetch';
import MealsCategories from './MealsCategories';
// import '../css/Meals.css';

function Meals() {
  const {
    mealListArray, setMealList, showMealCategoriesFilter } = useContext(MealsContext);
  const location = useLocation();
  const { setTitle } = useContext(TitleContext);
  const { fetchData } = useFetch();
  const MEALS_LIST_MAX_LENGTH = 12;

  useEffect(() => {
    if (location.pathname === '/meals') {
      setTitle('Meals');
    }
    fetchData('https://www.themealdb.com/api/json/v1/1/search.php?s=', setMealList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTitle, location, showMealCategoriesFilter]);

  return (
    <div>

      <MealsCategories />
      <div className="recipes-container">
        {mealListArray.slice(0, MEALS_LIST_MAX_LENGTH).map((recipe, index) => (
          <Link className="link-container" to={ `/meals/${recipe.idMeal}` } key={ index }>
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
              className="recipe-card-container"
            >
              <p
                data-testid={ `${index}-card-name` }
                className="recipe-name-text"
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Meals;
