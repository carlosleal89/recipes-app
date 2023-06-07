import { useLocation, Link } from 'react-router-dom';
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
      <div
        style={
          {
            marginLeft: '10px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px' }
        }
      >
        {mealListArray.slice(0, MEALS_LIST_MAX_LENGTH).map((recipe, index) => (
          <Link to={ `/meals/${recipe.idMeal}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <p
                data-testid={ `${index}-card-name` }
                style={ {
                  fontSize: 20,
                  fontStyle: 'italic',
                  padding: 0,
                  margin: 0,
                  marginLeft: '2rem',
                } }
              >
                { recipe.strMeal }
              </p>
              <img
                style={ {
                  width: '150px',
                  height: '150px',
                  marginBottom: '20px',
                } }
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
