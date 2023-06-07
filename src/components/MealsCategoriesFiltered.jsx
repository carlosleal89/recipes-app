import React, { useContext, useEffect } from 'react';
import MealsContext from '../context/MealsContext';

export default function MealsCategoriesFiltered() {
  const { mealsCategoriesFilter } = useContext(MealsContext);

//   useEffect(() => {
//     fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setMealsCategoriesFilter);
//   }, []);
  console.log(mealsCategoriesFilter);
  return (
    mealsCategoriesFilter.map((recipe, index) => (
      <div data-testid={ `${index}-recipe-card` } key={ index }>
        <img
          data-testid={ `${index}-card-img` }
          alt={ recipe.srtMeal }
          src={ recipe.strMealThumb }
        />
        <p data-testid={ `${index}-card-name` }>
          { recipe.strMeal }
        </p>
      </div>)));
}
