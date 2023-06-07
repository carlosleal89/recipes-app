import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import TitleContext from '../context/TitleContext';
import MealsContext from '../context/MealsContext';
import useFetch from '../hooks/useFetch';
import MealsCategories from './MealsCategories';

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
  }, [setTitle, location, showMealCategoriesFilter]);

  return (
    <div>
      <MealsCategories />
      {mealListArray.slice(0, MEALS_LIST_MAX_LENGTH).map((recipe, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            data-testid={ `${index}-card-img` }
            alt={ recipe.srtMeal }
            src={ recipe.strMealThumb }
          />
          <p data-testid={ `${index}-card-name` }>
            { recipe.strMeal }
          </p>
        </div>))}
    </div>
  );
}

export default Meals;
