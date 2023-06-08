import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import MealsCategories from './MealsCategories';

export default function MealsCategoriesFiltered() {
  const { mealsCategoriesFilter } = useContext(MealsContext);
  const MEALS_LIST_MAX_LENGTH = 12;
  //   useEffect(() => {
  //     fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setMealsCategoriesFilter);
  //   }, []);
  // console.log(mealsCategoriesFilter);
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
        {mealsCategoriesFilter.slice(0, MEALS_LIST_MAX_LENGTH).map((recipe, index) => (
          <Link to={ `/meals/${recipe.idMeal}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <p
                style={ {
                  fontSize: 20,
                  fontStyle: 'italic',
                  padding: 0,
                  margin: 0,
                  marginLeft: '2rem',
                } }
                data-testid={ `${index}-card-name` }
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
          </Link>))}
      </div>
    </div>
  );
}
